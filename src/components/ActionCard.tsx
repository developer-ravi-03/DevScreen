import { QuickActionType } from "@/constants";
import { Card } from "./ui/card";

// some weird tw bug, but this is how it works
// from-orange-500/10 via-orange-500/5 to-transparent
// from-blue-500/10 via-blue-500/5 to-transparent
// from-purple-500/10 via-purple-500/5 to-transparent
// from-primary/10 via-primary/5 to-transparent

function ActionCard({
  action,
  onClick,
}: {
  action: QuickActionType;
  onClick: () => void;
}) {
  return (
    <Card
      className="group relative overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm border-white/10"
      onClick={onClick}
    >
      {/* SHIMMER EFFECT */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

      {/* ANIMATED BORDER */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-[1px] rounded-lg bg-background/95" />

      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-70 transition-all duration-500`}
      />

      {/* FLOATING PARTICLES */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse group-hover:animate-bounce" />
      <div className="absolute top-8 right-8 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-300 group-hover:animate-bounce" />
      <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-700 group-hover:animate-bounce" />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative p-6 size-full">
        <div className="space-y-4">
          {/* ACTION ICON */}
          <div className="relative">
            {/* Icon glow effect */}
            <div
              className={`absolute inset-0 w-12 h-12 rounded-full bg-${action.color}/20 blur-xl group-hover:blur-2xl group-hover:scale-150 transition-all duration-500 opacity-0 group-hover:opacity-100`}
            />
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}/10 group-hover:bg-${action.color}/20 group-hover:scale-110 transition-all duration-300 border border-white/10 group-hover:border-white/20 shadow-lg`}
            >
              <action.icon
                className={`h-6 w-6 text-${action.color} group-hover:text-${action.color} transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-lg`}
              />
            </div>
          </div>

          {/* ACTION DETAILS */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl group-hover:text-primary transition-all duration-300 tracking-tight group-hover:tracking-wide drop-shadow-sm">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
              {action.description}
            </p>
          </div>

          {/* INTERACTIVE ARROW */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HIGHLIGHT */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
}

export default ActionCard;
