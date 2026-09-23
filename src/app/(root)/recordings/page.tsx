"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function RecordingPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls) return;

      try {
        // Get recordings for each call
        const callData = await Promise.all(
          calls.map((call) => call.queryRecordings())
        );
        const allRecordings = callData.flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch (error) {
        console.log("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <LoaderUI />;

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-1 py-8 sm:py-10">
      {/* HEADER SECTION */}
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Recordings</h1>
      <p className="my-2 text-sm text-muted-foreground">
        {recordings.length}{" "}
        {recordings.length === 1 ? "recording" : "recordings"} available
      </p>

      {/* RECORDINGS GRID */}

      <ScrollArea className="mt-7 h-[calc(100vh-12rem)]">
        {recordings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
            {recordings.map((r) => (
              <RecordingCard key={r.end_time} recording={r} />
            ))}
          </div>
        ) : (
          <div className="surface-card flex h-[400px] flex-col items-center justify-center gap-4 rounded-2xl">
            <p className="text-lg font-medium text-foreground">
              No recordings available
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
export default RecordingPage;
