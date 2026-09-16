import { CalendarDays, ChevronRight } from "lucide-react";
import type { DailyBoardData } from "@/types";

export function PreviousDayCard({
  board,
  isSelected,
  onSelectDate,
}: {
  board: DailyBoardData;
  isSelected?: boolean;
  onSelectDate?: (date: string) => void;
}) {
  return (
    <div
      className={`rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? "border-primary bg-primary-soft/30 shadow-card"
          : "border-border bg-card shadow-soft hover:border-primary/50 hover:shadow-card"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelectDate?.(board.date)}
        className="flex w-full items-center gap-2.5 px-4 py-3 text-left"
      >
        <CalendarDays
          className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
        />
        <span
          className={`text-[15px] font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
        >
          {board.label}
        </span>
        <span className="ml-auto text-[13px] text-muted-foreground">
          {board.live ? "Live" : "Closed"} · {board.petCount} pets
        </span>
        <ChevronRight
          className={`h-4 w-4 transition-transform ${isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground"}`}
        />
      </button>
    </div>
  );
}
