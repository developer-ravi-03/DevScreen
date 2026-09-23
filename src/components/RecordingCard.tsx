import { CallRecording } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";

function RecordingCard({ recording }: { recording: CallRecording }) {
  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(recording.url); toast.success("Recording link copied to clipboard"); }
    catch (error) { toast.error("Failed to copy link to clipboard"); }
  };

  const formattedStartTime = recording.start_time ? format(new Date(recording.start_time), "MMM d, yyyy · hh:mm a") : "Unknown";
  const duration = recording.start_time && recording.end_time ? calculateRecordingDuration(recording.start_time, recording.end_time) : "Unknown duration";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/20 hover:shadow-xl hover:shadow-indigo-950/15">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="grid size-8 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-200"><CalendarIcon className="size-4" /></span><span>{formattedStartTime}</span></div>
        <div className="flex items-center gap-2 text-sm text-slate-400"><span className="grid size-8 place-items-center rounded-lg bg-muted text-muted-foreground"><ClockIcon className="size-4" /></span><span>{duration}</span></div>
      </CardHeader>
      <CardContent className="pt-0">
        <button type="button" className="group/preview flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-slate-100 to-slate-200 dark:border-white/10 dark:from-slate-900 dark:to-slate-800" onClick={() => window.open(recording.url, "_blank")}>
          <span className="grid size-14 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-xl transition-all group-hover/preview:scale-105 group-hover/preview:bg-indigo-500"><PlayIcon className="ml-0.5 size-6" /></span>
        </button>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button className="flex-1" onClick={() => window.open(recording.url, "_blank")}><PlayIcon className="size-4" />Play recording</Button>
        <Button variant="secondary" size="icon" onClick={handleCopyLink} aria-label="Copy recording link"><CopyIcon className="size-4" /></Button>
      </CardFooter>
    </Card>
  );
}

export default RecordingCard;