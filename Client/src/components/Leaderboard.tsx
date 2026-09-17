import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { FilterKey, Pet } from "@/types";
import { PetCard } from "./PetCard";

const ITEMS_PER_PAGE = 20;

function applyFilter(pets: Pet[], filter: FilterKey, selectedCountryCode = "IN") {
  switch (filter) {
    case "dogs":
      return pets.filter((p) => p.type === "Dog" || p.type === "Dogs");
    case "cats":
      return pets.filter((p) => p.type === "Cat" || p.type === "Cats");
    case "birds":
      return pets.filter((p) => p.type === "Bird" || p.type === "Birds");
    case "new":
      return pets;
    case "hall":
      return pets.filter((p) => p.hallOfFame);
    case "country":
      return pets.filter(
        (p) =>
          p.countryCode?.toLowerCase() === selectedCountryCode.toLowerCase() ||
          p.country?.toLowerCase() === selectedCountryCode.toLowerCase()
      );
    default:
      return pets;
  }
}

export function Leaderboard({
  pets,
  filter,
  selectedCountryCode = "IN",
  onBid,
  onSelectPet,
}: {
  pets: Pet[];
  filter: FilterKey;
  selectedCountryCode?: string;
  onBid: (petId: string) => void;
  onSelectPet?: (pet: Pet, rank: number) => void;
}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filter, selectedCountryCode]);

  const filtered = applyFilter(pets, filter, selectedCountryCode);
  const visible = filter === "new" ? filtered : [...filtered].sort((a, b) => b.bid - a.bid);
  const totalPages = Math.ceil(visible.length / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedPets = visible.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (visible.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-card px-6 py-10 text-center text-muted-foreground">
        No pets in this category yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        {pagedPets.map((pet, i) => {
          const rank = startIndex + i + 1;
          return (
            <PetCard
              key={pet.id}
              pet={pet}
              rank={rank}
              onBid={onBid}
              onSelect={() => onSelectPet?.(pet, rank)}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-3 shadow-soft text-sm">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing <span className="text-foreground">{startIndex + 1}</span>–
            <span className="text-foreground">
              {Math.min(startIndex + ITEMS_PER_PAGE, visible.length)}
            </span>{" "}
            of <span className="text-foreground">{visible.length}</span> pets
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-bold transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>

            <span className="px-2 text-xs font-bold text-primary">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-bold transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
