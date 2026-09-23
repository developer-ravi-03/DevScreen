import { VideoIcon } from "lucide-react";

type BrandProps = {
  compact?: boolean;
};

export default function Brand({ compact = false }: BrandProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-600 brand-glow">
        <VideoIcon className="size-4.5 text-white" />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-cyan-300 ring-4 ring-background/90" />
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-tight text-white">
          Dev<span className="text-indigo-300">Screen</span>
        </span>
      )}
    </span>
  );
}