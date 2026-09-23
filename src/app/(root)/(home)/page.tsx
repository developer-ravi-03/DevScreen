"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc } from "../../../../convex/_generated/dataModel";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  Code2Icon,
  Loader2Icon,
  SparklesIcon,
  VideoIcon,
} from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import RoleSelectionModal from "@/components/RoleSelectionModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Interview = Doc<"interviews">;

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isLoading, needsRoleSelection } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();

  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };

  if (isLoading) return <LoaderUI />;

  return (
    <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-1 py-8 sm:py-10">
      {needsRoleSelection && <RoleSelectionModal />}

      <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-indigo-300/15 bg-gradient-to-br from-indigo-500/12 via-white/[0.035] to-blue-500/[0.03] p-7 shadow-2xl shadow-indigo-950/10 sm:p-10 lg:p-12">
        <div className="absolute -right-24 -top-28 size-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 size-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-400/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200">
              <SparklesIcon className="size-3.5" />
              DevScreen workspace
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              {isInterviewer ? (
                <>Everything for a <span className="gradient-text">better interview.</span></>
              ) : (
                <>Your next interview, <span className="gradient-text">one focused workspace.</span></>
              )}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {isInterviewer
                ? "Manage scheduling, live technical sessions, collaborative coding, and candidate review without switching tools."
                : "See your assigned interviews, join the live room at the right time, and keep your interview experience simple."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {isInterviewer && (
                <Link href="/schedule">
                  <Button size="lg" className="gap-2">
                    <CalendarDaysIcon className="size-4" />
                    Schedule interview
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </Link>
              )}
              <Link href="/recordings">
                <Button variant="outline" size="lg" className="gap-2">
                  <VideoIcon className="size-4" />
                  View recordings
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[390px]">
            {[
              [VideoIcon, "Live video", "Stream-powered rooms"],
              [Code2Icon, "Code together", "Developer workspace"],
              [CalendarDaysIcon, "Stay organized", "Scheduled sessions"],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof VideoIcon;
              return (
                <div key={title as string} className="surface-card rounded-2xl p-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-indigo-400/10 text-indigo-200">
                    <IconComponent className="size-4" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-white">{title as string}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {isInterviewer ? (
        <>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Quick actions</h2>
              <p className="mt-1 text-sm text-slate-500">Jump into the workflow you need.</p>
            </div>
            <Link href="/dashboard" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="gap-2 text-slate-400">
                View dashboard <ArrowRightIcon className="size-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">Your interviews</h2>
            <p className="mt-1 text-sm text-slate-500">View and join your scheduled interviews.</p>
          </div>
          <div className="mt-6">
            {interviews === undefined ? (
              <div className="flex justify-center py-16">
                <Loader2Icon className="size-8 animate-spin text-indigo-300" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview: Interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="surface-card rounded-2xl p-12 text-center">
                <p className="text-lg font-medium text-white">No scheduled interviews</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Assigned interviews will appear here when an interviewer schedules a session for you.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
