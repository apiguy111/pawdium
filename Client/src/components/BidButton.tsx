import { Plus } from "lucide-react";

export function BidButton({
  onClick,
  size = "md",
  label = "Raise bid",
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "md";
  label?: string;
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`${dim} inline-flex items-center justify-center rounded-full border border-border bg-muted text-foreground transition-colors hover:bg-primary-soft hover:text-primary`}
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
    </button>
  );
}
