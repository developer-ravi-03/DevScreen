import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

export const addComment = mutation({
  args: {
    interviewId: v.id("interviews"),
    content: v.string(),
    rating: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const interview = await ctx.db.get(args.interviewId);

    if (!interview || !interview.interviewerIds.includes(user.clerkId)) {
      throw new Error("Only assigned interviewers can submit feedback");
    }

    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    return await ctx.db.insert("comments", {
      interviewId: args.interviewId,
      content: args.content,
      rating: args.rating,
      interviewerId: user.clerkId,
    });
  },
});

export const getComments = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    const interview = await ctx.db.get(args.interviewId);

    if (
      !interview ||
      (!interview.interviewerIds.includes(user.clerkId) &&
        interview.candidateId !== user.clerkId)
    ) {
      throw new Error("You do not have access to this interview feedback");
    }

    return await ctx.db
      .query("comments")
      .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
      .collect();
  },
});