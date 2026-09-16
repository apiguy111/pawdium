import { ArrowRight } from "lucide-react";

export function StatusPill({
  online = 120,
  visitors = 144063,
  linkLabel = "see stats",
}: {
  online?: number;
  visitors?: number;
  linkLabel?: string;
}) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft/70 px-3.5 py-1.5 text-[13px]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-semibold text-primary">{online} online</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">
          {visitors.toLocaleString("en-US")} visitors
        </span>
        <span className="text-muted-foreground">·</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 font-medium text-foreground transition-opacity hover:opacity-70"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
