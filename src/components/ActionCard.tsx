import { QuickActionType } from "@/constants";
import { ArrowUpRightIcon } from "lucide-react";
import { Card } from "./ui/card";

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  return (
    <Card className="group relative min-h-52 cursor-pointer overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/30 hover:shadow-xl hover:shadow-indigo-950/10" onClick={onClick}>
      <div className={"absolute inset-0 bg-gradient-to-br " + action.gradient + " opacity-70 transition-opacity duration-300 group-hover:opacity-100"} />
      <div className="absolute -right-12 -top-12 size-32 rounded-full bg-indigo-400/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />
      <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-xl border border-indigo-300/15 bg-indigo-400/10 text-indigo-600 dark:text-indigo-600 dark:text-indigo-200 transition-all duration-300 group-hover:scale-105 group-hover:bg-indigo-400/15"><action.icon className="size-5" /></span>
          <span className="grid size-8 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition-all group-hover:text-indigo-200"><ArrowUpRightIcon className="size-4" /></span>
        </div>
        <div className="mt-10"><h3 className="text-lg font-semibold tracking-tight text-foreground">{action.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{action.description}</p></div>
      </div>
    </Card>
  );
}

export default ActionCard;