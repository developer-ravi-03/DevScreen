"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { BriefcaseBusinessIcon, Code2Icon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

type Role = "candidate" | "interviewer";

function RoleSelectionModal() {
  const setMyRole = useMutation(api.users.setMyRole);
  const [selectedRole, setSelectedRole] = useState<Role>("candidate");
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    setIsSaving(true);

    try {
      await setMyRole({ role: selectedRole });
      toast.success(
        selectedRole === "interviewer"
          ? "Interviewer account setup complete"
          : "Candidate account setup complete"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to save your role. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open>
      <DialogContent
        className="sm:max-w-[620px]"
        onPointerDownOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose your DevScreen role</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2 pt-4">
          <button type="button" onClick={() => setSelectedRole("candidate")} className="text-left">
            <Card className={[
              "h-full border-2 transition-all",
              selectedRole === "candidate"
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/40",
            ].join(" ")}>
              <CardContent className="p-6 space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code2Icon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Candidate</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Attend interviews scheduled for you and join assigned sessions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </button>

          <button type="button" onClick={() => setSelectedRole("interviewer")} className="text-left">
            <Card className={[
              "h-full border-2 transition-all",
              selectedRole === "interviewer"
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/40",
            ].join(" ")}>
              <CardContent className="p-6 space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BriefcaseBusinessIcon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Interviewer</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schedule interviews, select candidates and interviewers, and submit feedback.
                  </p>
                </div>
              </CardContent>
            </Card>
          </button>
        </div>

        <Button className="w-full mt-2" onClick={handleContinue} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2Icon className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Your role is selected once during account setup and cannot be changed later.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default RoleSelectionModal;