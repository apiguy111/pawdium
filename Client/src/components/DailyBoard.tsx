import { BadgeCheck, PawPrint } from "lucide-react";
import type { DailyBoardData, Pet } from "@/types";

export function DailyBoard({
  board,
  onClaim,
  onShowAll,
  onSelectPet,
}: {
  board: DailyBoardData;
  onClaim: () => void;
  onShowAll: () => void;
  onSelectPet?: (pet: Pet, rank: number) => void;
}) {
  const previewEntries = board.entries.slice(0, 5);

  return (
    <section className="surface-card overflow-hidden px-5 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">{board.label}</h2>
          {board.live ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              Live
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
              Closed Board
            </span>
          )}
        </div>
        <p className="text-[13px] font-semibold text-muted-foreground">
          {board.live ? "Open" : "Closed"} · {board.petCount} pets
        </p>
      </div>
      <p className="mt-1 text-sm text-primary">
        {board.live
          ? "This day is still open for claims. It closes at midnight UTC."
          : `This board closed at midnight UTC with ${board.petCount} pets competing.`}
      </p>

      {previewEntries.length === 0 ? (
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-8 text-center text-muted-foreground">
          <p className="text-sm font-semibold">No pets competed on this date.</p>
          <p className="mt-1 text-xs text-muted-foreground/80">Be the first to claim a rank!</p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-border rounded-xl border border-border">
          {previewEntries.map((entry) => (
            <div
              key={entry.pet.id}
              onClick={() => onSelectPet?.(entry.pet, entry.rank)}
              className="flex items-center gap-4 px-4 py-3.5 transition-colors cursor-pointer hover:bg-muted/40"
            >
              <span className="w-8 text-base font-bold text-primary">#{entry.rank}</span>
              <img
                src={entry.pet.image}
                alt={entry.pet.name}
                loading="lazy"
                width={512}
                height={512}
                className="h-[56px] w-[56px] shrink-0 rounded-full object-cover ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <h3 className="inline-flex items-center gap-1.5 text-[15px] font-bold">
                  {entry.pet.name}
                  {entry.pet.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                </h3>
                <p className="text-[13px] text-muted-foreground">
                  {entry.pet.breed} <span className="px-1">•</span> {entry.pet.city},{" "}
                  {entry.pet.country}
                </p>
                <span className="mt-1 inline-block rounded-md bg-primary-soft px-2 py-0.5 text-[12px] font-medium text-primary">
                  Owner: {entry.pet.owner}
                </span>
                <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">
                  {entry.pet.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-lg font-extrabold text-primary">${entry.bid}</p>
                <p className="text-[12px] text-muted-foreground">highest bid</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onClaim}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <PawPrint className="h-4 w-4" />
          Claim a rank
        </button>
        <button
          type="button"
          onClick={onShowAll}
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold transition-colors hover:bg-muted"
        >
          Show all ranks ({board.entries.length})
        </button>
      </div>
    </section>
  );
}
