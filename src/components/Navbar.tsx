"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { HomeIcon, LayoutDashboardIcon, LibraryBigIcon } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useUserRole } from "@/hooks/useUserRole";
import Brand from "./Brand";
import { Button } from "./ui/button";

function Navbar() {
  const { isInterviewer, isLoading } = useUserRole();

  return (
    <nav className="app-navbar sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-90">
          <Brand />
        </Link>

        <SignedIn>
          <div className="flex min-w-0 items-center gap-2">
            <div className="hidden items-center gap-1 rounded-xl border border-border bg-card/70 p-1 md:flex">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <HomeIcon className="size-4" />
                  Home
                </Button>
              </Link>

              <Link href="/recordings">
                <Button variant="ghost" size="sm" className="gap-2">
                  <LibraryBigIcon className="size-4" />
                  Recordings
                </Button>
              </Link>

              {!isLoading && isInterviewer && (
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboardIcon className="size-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card/70 p-1.5 shadow-sm">
              <ModeToggle />
              <div className="mx-0.5 h-7 w-px bg-border" />
              <UserButton />
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
