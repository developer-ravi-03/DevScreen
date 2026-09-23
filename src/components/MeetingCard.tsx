import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon, Clock3Icon, VideoIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();
  const status = getMeetingStatus(interview);
  const formattedDate = format(new Date(interview.startTime), "EEE, MMM d · h:mm a");

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/20 hover:shadow-xl hover:shadow-indigo-950/15">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-muted-foreground"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-200"><CalendarIcon className="size-4" /></span><span className="truncate">{formattedDate}</span></div>
          <Badge variant={status === "live" ? "default" : status === "upcoming" ? "secondary" : "outline"} className="shrink-0">{status === "live" ? "Live now" : status === "upcoming" ? "Upcoming" : "Completed"}</Badge>
        </div>
        <div><CardTitle className="text-xl">{interview.title}</CardTitle>{interview.description && <CardDescription className="mt-2 line-clamp-2 leading-6">{interview.description}</CardDescription>}</div>
      </CardHeader>
      <CardContent className="pt-0">
        {status === "live" && <Button className="w-full" onClick={() => joinMeeting(interview.streamCallId)}><VideoIcon className="size-4" />Join Meeting</Button>}
        {status === "upcoming" && <Button variant="outline" className="w-full" disabled><Clock3Icon className="size-4" />Waiting to start</Button>}
      </CardContent>
    </Card>
  );
}

export default MeetingCard;