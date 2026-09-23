import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const canAccessInterview = (interview: any, clerkId: string) =>
  interview.candidateId === clerkId ||
  interview.interviewerIds.includes(clerkId) ||
  interview.createdBy === clerkId;

const getCurrentUser = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", identity.subject))
    .first();

  if (!user) throw new Error("User profile not found");
  return user;
};

const getAccessibleInterviews = async (ctx: any, clerkId: string) => {
  const interviews = await ctx.db.query("interviews").collect();

  return interviews.filter((interview: any) =>
    canAccessInterview(interview, clerkId)
  );
};

export const getAllInterviews = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    if (user.role !== "interviewer") return [];

    return await getAccessibleInterviews(ctx, user.clerkId);
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    return await getAccessibleInterviews(ctx, user.clerkId);
  },
});

export const getInterviewByStreamCallId = query({
  args: { streamCallId: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    const interview = await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();

    if (!interview || !canAccessInterview(interview, user.clerkId)) {
      return null;
    }

    return interview;
  },
});

export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    if (user.role !== "interviewer") {
      throw new Error("Only interviewers can schedule interviews");
    }

    const uniqueInterviewers = [...new Set(args.interviewerIds)];

    if (!uniqueInterviewers.includes(user.clerkId)) {
      throw new Error("The scheduler must be an assigned interviewer");
    }

    const candidate = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", args.candidateId))
      .first();

    if (!candidate || candidate.role !== "candidate") {
      throw new Error("Invalid candidate");
    }

    for (const interviewerId of uniqueInterviewers) {
      const interviewer = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q: any) =>
          q.eq("clerkId", interviewerId)
        )
        .first();

      if (!interviewer || interviewer.role !== "interviewer") {
        throw new Error("Invalid interviewer selected");
      }
    }

    if (args.startTime <= Date.now()) {
      throw new Error("Interview time must be in the future");
    }

    return await ctx.db.insert("interviews", {
      title: args.title,
      description: args.description,
      startTime: args.startTime,
      status: args.status,
      streamCallId: args.streamCallId,
      candidateId: args.candidateId,
      interviewerIds: uniqueInterviewers,
      createdBy: user.clerkId,
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const interview = await ctx.db.get(args.id);

    if (!interview || !canAccessInterview(interview, user.clerkId)) {
      throw new Error("You do not have access to this interview");
    }

    if (
      user.role !== "interviewer" ||
      (!interview.interviewerIds.includes(user.clerkId) &&
        interview.createdBy !== user.clerkId)
    ) {
      throw new Error("Only assigned interviewers can update interview status");
    }

    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});