"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import LoaderUI from "@/components/LoaderUI";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { INTERVIEW_CATEGORY } from "@/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
  PlusIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import { format } from "date-fns";
import CommentDialog from "@/components/CommentDialog";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);
  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  //status handle pass or fail
  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
  ) => {
    try {
      await updateStatus({ id: interviewId, status });
      toast.success(`Interview marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (!interviews || !users) return <LoaderUI />;

  const groupedInterviews = groupInterviews(interviews);

  // Calculate stats
  const totalInterviews = interviews.length;
  const completedInterviews = interviews.filter(
    (i) => i.status === "completed"
  ).length;
  const successfulInterviews = interviews.filter(
    (i) => i.status === "succeeded"
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Interview Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and track all your interviews
              </p>
            </div>

            <Link href="/schedule">
              <Button size="lg" className="shadow-sm">
                <PlusIcon className="h-5 w-5 mr-2" />
                Schedule New Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Interviews
                  </p>
                  <p className="text-3xl font-bold">{totalInterviews}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <p className="text-3xl font-bold">{completedInterviews}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-full">
                  <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold">
                    {completedInterviews > 0
                      ? Math.round(
                          (successfulInterviews / completedInterviews) * 100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <TrendingUpIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Categories */}
        <div className="space-y-12">
          {INTERVIEW_CATEGORY.map(
            (category) =>
              groupedInterviews[category.id]?.length > 0 && (
                <section key={category.id} className="space-y-6">
                  {/* CATEGORY TITLE */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-0.5 w-8 bg-primary rounded-full"></div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {category.title}
                      </h2>
                    </div>
                    <Badge variant={category.variant} className="text-sm">
                      {groupedInterviews[category.id].length}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedInterviews[category.id].map(
                      (interview: Interview) => {
                        const candidateInfo = getCandidateInfo(
                          users,
                          interview.candidateId
                        );
                        const startTime = new Date(interview.startTime);

                        return (
                          <Card
                            key={interview._id}
                            className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-border/40 hover:border-border"
                          >
                            {/* CANDIDATE INFO */}
                            <CardHeader className="pb-3">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-11 w-11 border-2 border-border">
                                    <AvatarImage src={candidateInfo.image} />
                                    <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                                      {candidateInfo.initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <CardTitle className="text-base font-semibold leading-none truncate">
                                    {candidateInfo.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {interview.title}
                                  </p>
                                </div>
                              </div>
                            </CardHeader>

                            {/* DATE & TIME */}
                            <CardContent className="py-3">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="p-1.5 bg-muted rounded-md">
                                    <CalendarIcon className="h-3.5 w-3.5" />
                                  </div>
                                  <span className="font-medium">
                                    {format(startTime, "MMM dd, yyyy")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="p-1.5 bg-muted rounded-md">
                                    <ClockIcon className="h-3.5 w-3.5" />
                                  </div>
                                  <span className="font-medium">
                                    {format(startTime, "hh:mm a")}
                                  </span>
                                </div>
                              </div>
                            </CardContent>

                            {/* PASS & FAIL BUTTONS */}
                            <CardFooter className="pt-3 flex flex-col gap-3">
                              {interview.status === "completed" && (
                                <div className="flex gap-2 w-full">
                                  <Button
                                    size="sm"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() =>
                                      handleStatusUpdate(
                                        interview._id,
                                        "succeeded"
                                      )
                                    }
                                  >
                                    <CheckCircle2Icon className="h-4 w-4 mr-2" />
                                    Pass
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() =>
                                      handleStatusUpdate(
                                        interview._id,
                                        "failed"
                                      )
                                    }
                                  >
                                    <XCircleIcon className="h-4 w-4 mr-2" />
                                    Fail
                                  </Button>
                                </div>
                              )}
                              {/* for add comment  */}
                              <CommentDialog interviewId={interview._id} />
                            </CardFooter>
                          </Card>
                        );
                      }
                    )}
                  </div>
                </section>
              )
          )}
        </div>

        {/* Empty State */}
        {interviews.length === 0 && (
          <Card className="mx-auto max-w-md">
            <CardContent className="pt-6 pb-8 text-center">
              <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                <UsersIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Interviews Yet</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Get started by scheduling your first interview
              </p>
              <Link href="/schedule">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
