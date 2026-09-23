"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

function MeetingPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : undefined;
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const access = useQuery(
    api.interviews.getMeetingAccess,
    id ? { streamCallId: id } : "skip"
  );

  const { call, isCallLoading } = useGetCallById(id || "");

  if (!id) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Invalid meeting ID</p>
      </div>
    );
  }

  if (access === undefined || isCallLoading) return <LoaderUI />;

  if (access.isScheduled && !access.isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <p className="text-2xl font-semibold">Access denied</p>
          <p className="text-muted-foreground">
            You are not a candidate or interviewer assigned to this interview.
          </p>
        </div>
      </div>
    );
  }

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}

export default MeetingPage;
