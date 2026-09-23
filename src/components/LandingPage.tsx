"use client";

import {
  ArrowRightIcon,
  BarChart3Icon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  Code2Icon,
  MessageSquareIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Brand from "./Brand";
import { ModeToggle } from "./ModeToggle";

const features = [
  {
    icon: VideoIcon,
    title: "High-quality video",
    description: "Focused, low-friction video rooms built around the technical interview.",
  },
  {
    icon: Code2Icon,
    title: "Integrated code editor",
    description: "Collaborate on code in the same room instead of switching between tools.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Smart scheduling",
    description: "Create interviews, assign participants, and keep every session organized.",
  },
  {
    icon: BarChart3Icon,
    title: "Interview feedback",
    description: "Capture structured notes and ratings after the conversation is complete.",
  },
];

function InterviewWorkspacePreview() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="absolute -inset-8 rounded-[3rem] bg-indigo-500/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_30px_90px_-35px_rgba(37,99,235,.35)] dark:border-white/10 dark:bg-[#0b1020] dark:shadow-[0_30px_90px_-35px_rgba(79,70,229,.55)]">
        <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4 dark:border-white/10">
          <div className="flex items-center gap-2">
            <Brand compact />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Frontend Developer Interview</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">● Live</span>
            <span className="hidden text-slate-400 sm:inline">24:31</span>
          </div>
        </div>

        <div className="grid gap-3 p-3 lg:grid-cols-[150px_1fr]">
          <aside className="hidden rounded-xl border border-slate-200 bg-slate-50 p-2 lg:block dark:border-white/10 dark:bg-white/[0.025]">
            <div className="space-y-1">
              {["Overview", "Schedule", "Interviews", "Recordings", "Candidates"].map((item, i) => (
                <div key={item} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] ${i === 0 ? "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300" : "text-slate-500 dark:text-slate-400"}`}>
                  {i === 0 ? <SparklesIcon className="size-3.5" /> : <CalendarDaysIcon className="size-3.5" />}
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="size-7 rounded-full bg-gradient-to-br from-indigo-400 to-blue-600" />
              <p className="mt-2 text-[11px] font-medium text-slate-700 dark:text-slate-200">Ravi Kumar</p>
              <p className="text-[10px] text-slate-400">Interviewer</p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-2.5">
              {[
                ["Interviewer", "RK"],
                ["Candidate", "JS"],
              ].map(([role, initials]) => (
                <div key={role} className="relative aspect-[1.55] overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 dark:border-white/10 dark:from-slate-800 dark:to-slate-900">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(99,102,241,.18),transparent_45%)]" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid size-12 place-items-center rounded-full border border-white/30 bg-white/20 text-sm font-semibold text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-indigo-200">{initials}</span>
                  </div>
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-2 py-1 text-[10px] text-white backdrop-blur">{role}</span>
                  <span className="absolute bottom-2 right-2 size-2 rounded-full bg-emerald-400 ring-2 ring-black/20" />
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-[#101827]">
                <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-2 text-[10px] dark:border-white/10">
                  <span className="font-medium text-slate-600 dark:text-slate-300">index.js</span>
                  <span className="text-indigo-500 dark:text-indigo-300">JavaScript</span>
                </div>
                <pre className="overflow-hidden text-[9px] leading-5 text-slate-600 dark:text-slate-300">{`function solve(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];
    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }
    seen.set(nums[i], i);
  }
}`}</pre>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#101827]">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-[10px] font-medium text-slate-600 dark:border-white/10 dark:text-slate-300">
                  <MessageSquareIcon className="size-3.5 text-indigo-500 dark:text-indigo-300" /> Interview chat
                </div>
                <div className="space-y-2.5 pt-3">
                  {[
                    ["Interviewer", "Walk me through the approach."],
                    ["Candidate", "I will use a hash map for O(n)."],
                    ["Interviewer", "Good. What are the edge cases?"],
                  ].map(([author, message]) => (
                    <div key={message}>
                      <p className="text-[9px] font-medium text-indigo-600 dark:text-indigo-300">{author}</p>
                      <p className="mt-0.5 text-[10px] leading-4 text-slate-500 dark:text-slate-400">{message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
            <ShieldCheckIcon className="size-3.5 text-indigo-500 dark:text-indigo-300" /> Private interview workspace
          </div>
          <span className="text-[10px] text-slate-400">DevScreen</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="public-landing min-h-screen overflow-x-hidden bg-white text-slate-950 dark:bg-[#070b14] dark:text-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/80">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="shrink-0"><Brand /></Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              ["Features", "#features"],
              ["How it works", "#how-it-works"],
              ["For teams", "#for-teams"],
              ["Start", "#cta"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">{label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-white/10 sm:block" />
            <SignInButton>
              <button className="hidden h-10 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:inline-flex dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">Sign in</button>
            </SignInButton>
            <SignUpButton>
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-md">Start interviewing <ArrowRightIcon className="size-4" /></button>
            </SignUpButton>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(99,102,241,.13),transparent_30rem)] dark:bg-[radial-gradient(circle_at_75%_20%,rgba(99,102,241,.18),transparent_30rem)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.82fr_1.18fr] lg:gap-10 lg:py-28">
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                <span className="size-1.5 rounded-full bg-indigo-500" /> Built for technical interviews
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.5rem] lg:leading-[.98] dark:text-white">
                Technical interviews
                <span className="block">built for <span className="gradient-text">real talent.</span></span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400">
                Conduct technical interviews with real-time video, collaborative coding, scheduling, and structured feedback — all in one place.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <SignUpButton>
                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-500">Create workspace <ArrowRightIcon className="size-4" /></button>
                </SignUpButton>
                <a href="#features" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:bg-white/[0.06]"><PlayCircleIcon className="size-4 text-indigo-500" /> Explore the product</a>
              </div>

              <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
                {[
                  [VideoIcon, "Real-time"],
                  [ShieldCheckIcon, "Secure"],
                  [UsersIcon, "Developer-first"],
                ].map(([Icon, label]) => {
                  const IconComponent = Icon as typeof VideoIcon;
                  return (
                    <div key={label as string} className="flex items-center gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-indigo-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-indigo-300"><IconComponent className="size-4" /></span>
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{label as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <InterviewWorkspacePreview />
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_.6fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-indigo-600 dark:text-indigo-300">Features</p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-4xl dark:text-white">Everything you need for effective technical interviews.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500 lg:justify-self-end dark:text-slate-400">From the first invitation to post-interview feedback, keep the workflow focused and easy to manage.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60 dark:border-white/10 dark:bg-white/[0.025] dark:hover:border-indigo-400/20 dark:hover:shadow-indigo-950/20">
                <div className="grid size-10 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><Icon className="size-5" /></div>
                <h3 className="mt-5 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y border-slate-200 bg-slate-50/70 dark:border-white/5 dark:bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-indigo-600 dark:text-indigo-300">How it works</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">One workspace. Three simple steps.</h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {[
                ["01", "Create your account", "Choose your interviewer or candidate role and enter your workspace."],
                ["02", "Schedule or join", "Set up a session, assign participants, or join an interview you were invited to."],
                ["03", "Interview together", "Talk, code, collaborate, and capture feedback without leaving the room."],
              ].map(([number, title, description]) => (
                <div key={number} className="rounded-xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-[#0c1220]">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-300">{number}</span>
                  <h3 className="mt-8 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="for-teams" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 sm:p-10 dark:border-indigo-400/10 dark:from-indigo-500/10 dark:to-white/[0.02]">
              <CheckCircle2Icon className="size-6 text-indigo-600 dark:text-indigo-300" />
              <h2 className="mt-5 max-w-xl text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">A focused experience for interviewers and candidates.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">Keep scheduling, live collaboration, access control, recordings, and feedback connected to the same interview.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c1220]">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200"><Code2Icon className="size-5 text-indigo-500 dark:text-indigo-300" /> Developer-first workflow</div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {["Video calls", "Code editor", "Scheduling", "Recordings"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.025] dark:text-slate-300">{item}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="border-t border-slate-200 dark:border-white/5">
          <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
            <div className="mx-auto grid size-11 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300"><SparklesIcon className="size-5" /></div>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl dark:text-white">Ready for your next technical interview?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">Start with DevScreen and keep the entire interview workflow in one focused workspace.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <SignUpButton><button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">Create workspace <ArrowRightIcon className="size-4" /></button></SignUpButton>
              <SignInButton><button className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:bg-white/[0.06]">Sign in</button></SignInButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:text-slate-400">
          <Brand />
          <p>© {new Date().getFullYear()} DevScreen. Built for better technical interviews.</p>
        </div>
      </footer>
    </div>
  );
}
