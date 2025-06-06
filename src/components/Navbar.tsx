"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import DasboardBtn from "./DasboardBtn";
import { useUserRole } from "@/hooks/useUserRole";

function Navbar() {
  const { isCandidate, isLoading } = useUserRole();
  const showDashboard = !isCandidate && !isLoading;

  return (
    <nav className="relative bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-cyan-500/20 overflow-hidden">
      {/* Animated background pattern - adaptive for light/dark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] animate-pulse" />
      <div
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.02),transparent)] dark:bg-[conic-gradient(from_0deg,transparent,rgba(6,182,212,0.05),transparent)] animate-spin"
        style={{ animationDuration: "20s" }}
      />

      <div className="relative z-10">
        <div className="flex h-14 sm:h-16 md:h-18 lg:h-20 items-center justify-between px-0.5 sm:px-6 md:px-8 container mx-auto">
          {/* LEFT SIDE - LOGO */}
          <Link
            href="/"
            className="group relative flex items-center gap-2 sm:gap-3 font-mono text-lg sm:text-xl md:text-2xl font-bold"
          >
            {/* Neon glow effect - adaptive colors */}
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:via-emerald-500/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

            <div className="relative flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg border border-gray-300 dark:border-cyan-500/20 bg-gray-50/80 dark:bg-slate-900/50 backdrop-blur-sm group-hover:border-indigo-400/50 dark:group-hover:border-cyan-400/50 group-hover:bg-gray-100/90 dark:group-hover:bg-slate-800/60 transition-all duration-300">
              <div className="relative">
                <CodeIcon className="size-6 sm:size-7 md:size-8 text-indigo-600 dark:text-cyan-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-300 transition-colors duration-300" />
                {/* Orbiting dots - adaptive colors */}
                <div className="absolute -inset-2">
                  <div
                    className="absolute top-0 left-1/2 w-1 h-1 bg-indigo-500 dark:bg-cyan-400 rounded-full animate-ping group-hover:bg-purple-500 dark:group-hover:bg-emerald-400"
                    style={{ animationDuration: "2s" }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-1 h-1 bg-purple-500 dark:bg-emerald-400 rounded-full animate-ping"
                    style={{
                      animationDuration: "2.5s",
                      animationDelay: "0.5s",
                    }}
                  />
                </div>
              </div>

              <span className="text-gray-800 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-cyan-100 transition-colors duration-300 tracking-wider">
                Dev
                <span className="text-indigo-600 dark:text-cyan-400 group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  Screen
                </span>
              </span>

              {/* Scanning line effect - adaptive colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 dark:via-cyan-400/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
            </div>
          </Link>

          {/* RIGHT SIDE - ACTIONS */}
          <SignedIn>
            {/* Desktop Layout (lg+) - Floating Card Design */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center bg-gray-100/90 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-gray-300 dark:border-cyan-500/20 p-1 shadow-xl shadow-gray-300/20 dark:shadow-cyan-500/10">
                <div className="flex items-center space-x-3">
                  {showDashboard && (
                    <>
                      <div className="relative group/item">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:to-emerald-500/20 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 p-3 rounded-xl border border-transparent group-hover/item:border-indigo-300 dark:group-hover/item:border-cyan-400/30 group-hover/item:bg-white/60 dark:group-hover/item:bg-slate-800/50 transition-all duration-300">
                          <DasboardBtn />
                        </div>
                        {/* Neon corner accents - adaptive colors */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-indigo-500 dark:border-cyan-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-500 dark:border-emerald-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 dark:via-cyan-500/50 to-transparent" />
                    </>
                  )}

                  <div className="relative group/item">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 p-3 rounded-xl border border-transparent group-hover/item:border-purple-300 dark:group-hover/item:border-emerald-400/30 group-hover/item:bg-white/60 dark:group-hover/item:bg-slate-800/50 transition-all duration-300">
                      <ModeToggle />
                    </div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-500 dark:border-emerald-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pink-500 dark:border-teal-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 dark:via-emerald-500/50 to-transparent" />

                  <div className="relative group/item">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 dark:from-teal-500/20 dark:to-cyan-500/20 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 p-3 rounded-xl border border-transparent group-hover/item:border-pink-300 dark:group-hover/item:border-teal-400/30 group-hover/item:bg-white/60 dark:group-hover/item:bg-slate-800/50 transition-all duration-300">
                      <UserButton />
                    </div>
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pink-500 dark:border-teal-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-indigo-500 dark:border-cyan-400 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tablet Layout (md to lg) */}
            <div className="hidden md:flex lg:hidden items-center">
              <div className="flex items-center space-x-2 bg-gray-100/95 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-gray-300 dark:border-cyan-500/30 shadow-lg shadow-gray-300/20 dark:shadow-cyan-500/10">
                {showDashboard && (
                  <>
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-indigo-400/15 dark:bg-cyan-400/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 p-1">
                        <DasboardBtn />
                      </div>
                    </div>
                    <div className="w-px h-6 bg-gray-400 dark:bg-cyan-500/40" />
                  </>
                )}

                <div className="relative group/btn">
                  <div className="absolute inset-0 bg-purple-400/15 dark:bg-emerald-400/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 p-1">
                    <ModeToggle />
                  </div>
                </div>
                <div className="w-px h-6 bg-gray-400 dark:bg-emerald-500/40" />
                <div className="relative group/btn">
                  <div className="absolute inset-0 bg-pink-400/15 dark:bg-teal-400/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 p-1">
                    <UserButton />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout (sm and below) */}
            <div className="flex md:hidden items-center">
              {/* Advanced mobile container with morphing effects */}
              <div className="relative group">
                {/* Main container */}
                <div className="relative flex items-center  bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl  border border-gray-200/50 dark:border-cyan-500/30 shadow-xl shadow-gray-400/20 dark:shadow-cyan-500/20">
                  {/* Individual button containers with unique animations */}
                  {showDashboard && (
                    <>
                      <div className="relative group/btn overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-blue-500/30 rounded-xl scale-0 group-hover/btn:scale-100 transition-transform duration-300 ease-out" />
                        <div className="absolute inset-0 bg-indigo-500/5 dark:bg-cyan-500/10 rounded-xl translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                        <div className="relative z-10 p-1 rounded-xl active:scale-95 transition-transform duration-100">
                          <DasboardBtn />
                        </div>
                        {/* Micro sparkle effect */}
                        <div className="absolute top-1 right-1 w-1 h-1 bg-indigo-400 dark:bg-cyan-400 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping transition-opacity duration-300" />
                      </div>

                      {/* Animated separator */}
                      <div className="relative">
                        <div className="w-px h-6 bg-gradient-to-b from-gray-300 via-indigo-400 to-gray-300 dark:from-slate-600 dark:via-cyan-400 dark:to-slate-600 opacity-60" />
                        <div className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-indigo-400 dark:via-cyan-400 to-transparent animate-pulse" />
                      </div>
                    </>
                  )}

                  <div className="relative group/btn overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-emerald-500/30 dark:to-teal-500/30 rounded-xl scale-0 group-hover/btn:scale-100 transition-transform duration-300 ease-out" />
                    <div className="absolute inset-0 bg-purple-500/5 dark:bg-emerald-500/10 rounded-xl translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                    <div className="relative z-10 p-1 rounded-xl active:scale-95 transition-transform duration-100">
                      <ModeToggle />
                    </div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-purple-400 dark:bg-emerald-400 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping transition-opacity duration-300" />
                  </div>

                  <div className="relative">
                    <div className="w-px h-6 bg-gradient-to-b from-gray-300 via-purple-400 to-gray-300 dark:from-slate-600 dark:via-emerald-400 dark:to-slate-600 opacity-60" />
                    <div
                      className="absolute inset-0 w-px bg-gradient-to-b from-transparent via-purple-400 dark:via-emerald-400 to-transparent animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>

                  <div className="relative group/btn overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-500/20 dark:from-teal-500/30 dark:to-cyan-500/30 rounded-xl scale-0 group-hover/btn:scale-100 transition-transform duration-300 ease-out" />
                    <div className="absolute inset-0 bg-pink-500/5 dark:bg-teal-500/10 rounded-xl translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                    <div className="relative z-10 p-1 rounded-xl active:scale-95 transition-transform duration-100">
                      <UserButton />
                    </div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-pink-400 dark:bg-teal-400 rounded-full opacity-0 group-hover/btn:opacity-100 animate-ping transition-opacity duration-300" />
                  </div>
                </div>

                {/* Floating accent dots */}
                <div
                  className="absolute -top-1 -left-1 w-2 h-2 bg-indigo-400 dark:bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-opacity duration-300"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 dark:bg-teal-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-opacity duration-300"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          </SignedIn>
        </div>
      </div>

      {/* Bottom accent line - adaptive colors */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 dark:via-cyan-400/60 to-transparent" />
    </nav>
  );
}
export default Navbar;
