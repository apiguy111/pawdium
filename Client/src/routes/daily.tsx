import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DailyBoard } from "@/components/DailyBoard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PetDetailModal } from "@/components/PetDetailModal";
import { PreviousDayCard } from "@/components/PreviousDayCard";
import { StatusPill } from "@/components/StatusPill";
import { COUNTRIES } from "@/components/PetSubmissionForm";
import { fetchBidsByDate, fetchAllPets, incrementPetViewsApi } from "@/lib/api";
import type { DailyBoardData, DailyEntry, Pet } from "@/types";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Daily Boards — Pawdium.lol" },
      {
        name: "description",
        content:
          "Every UTC day gets its own pet leaderboard. Today stays live until midnight UTC, then the board closes for good.",
      },
      { property: "og:title", content: "Daily Boards — Pawdium.lol" },
      {
        name: "description",
        content:
          "Every UTC day gets its own pet leaderboard. Today stays live until midnight UTC.",
      },
    ],
  }),
  component: DailyPage,
});

const ITEMS_PER_PAGE = 20;

// Helper to generate the last N dates from today
function getLastDates(count = 5): { date: string; label: string; live: boolean }[] {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().split("T")[0]!;
    const label = d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
    dates.push({
      date: dateStr,
      label,
      live: i === 0,
    });
  }
  return dates;
}

function DailyPage() {
  const navigate = useNavigate();
  const dateConfigs = getLastDates(5);
  const defaultDate = dateConfigs[0]?.date || new Date().toISOString().split("T")[0]!;

  const [boards, setBoards] = useState<DailyBoardData[]>(() =>
    dateConfigs.map((cfg) => ({
      date: cfg.date,
      label: cfg.label,
      live: cfg.live,
      petCount: 0,
      entries: [],
    }))
  );

  const [selectedDate, setSelectedDate] = useState<string>(defaultDate);
  const [showFullRankings, setShowFullRankings] = useState<boolean>(false);
  const [showAllDates, setShowAllDates] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedRank, setSelectedRank] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOpenPetDetails = (pet: Pet, rank: number) => {
    const currentViews = pet.views ?? 0;
    const optimisticPet = { ...pet, views: currentViews + 1 };
    setSelectedPet(optimisticPet);
    setSelectedRank(rank);

    if (pet.id && !pet.id.startsWith("milo") && !pet.id.startsWith("cleo") && !pet.id.startsWith("apollo")) {
      incrementPetViewsApi(pet.id).then((serverViews) => {
        if (typeof serverViews === "number") {
          setSelectedPet((prev) =>
            prev && prev.id === pet.id ? { ...prev, views: serverViews } : prev
          );
          setBoards((prevBoards) =>
            prevBoards.map((b) => ({
              ...b,
              entries: b.entries.map((e) =>
                e.pet.id === pet.id
                  ? { ...e, pet: { ...e.pet, views: serverViews } }
                  : e
              ),
            }))
          );
        }
      });
    }
  };

  // Fetch real data for each of the last 5 dates
  useEffect(() => {
    async function loadDailyBoards() {
      setIsLoading(true);
      try {
        const allPets = await fetchAllPets();
        const updatedBoards = await Promise.all(
          dateConfigs.map(async (cfg) => {
            const bids = await fetchBidsByDate(cfg.date);

            // If bids exist for this date, aggregate highest bid per pet
            const petBidMap = new Map<string, { bid: number; pet: any }>();

            bids.forEach((b: any) => {
              if (b.petId) {
                const pId = b.petId._id || b.petId.id;
                const existing = petBidMap.get(pId);
                const bidAmount = b.amount || 0;
                if (!existing || bidAmount > existing.bid) {
                  petBidMap.set(pId, {
                    bid: bidAmount,
                    pet: b.petId,
                  });
                }
              }
            });

            // If today's live board has no bids yet, include current active pets
            if (cfg.live && petBidMap.size === 0 && allPets.length > 0) {
              allPets.forEach((p) => {
                if (p._id && p.currentBid > 0) {
                  petBidMap.set(p._id, {
                    bid: p.currentBid,
                    pet: p,
                  });
                }
              });
            }

            // Sort by bid descending
            const sorted = Array.from(petBidMap.values()).sort(
              (a, b) => b.bid - a.bid
            );

            const entries: DailyEntry[] = sorted.map((item, idx) => {
              const matchingCountry = COUNTRIES.find(
                (c) =>
                  c.name.toLowerCase() === item.pet.country?.toLowerCase()
              );
              const petFormatted: Pet = {
                id: item.pet._id || item.pet.id,
                name: item.pet.petName,
                tagline: "",
                description: item.pet.about || "Spotlight contestant",
                owner: item.pet.ownerName,
                breed: item.pet.breed || "Standard",
                type: item.pet.petType || "Dog",
                city: item.pet.city || "Hyderabad",
                country: item.pet.country || "India",
                countryCode: matchingCountry?.code || "IN",
                image: item.pet.imageUrl,
                bid: item.bid,
                activity: "Active today",
                engagement: `${item.pet.views || 0} views`,
                views: item.pet.views || 0,
              };

              return {
                rank: idx + 1,
                pet: petFormatted,
                bid: item.bid,
              };
            });

            return {
              date: cfg.date,
              label: cfg.label,
              live: cfg.live,
              petCount: entries.length,
              entries,
            };
          })
        );

        setBoards(updatedBoards);
      } catch (err) {
        console.error("Error loading daily boards:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDailyBoards();
  }, []);

  const activeBoard: DailyBoardData =
    boards.find((b) => b.date === selectedDate) ??
    boards[0] ?? {
      date: defaultDate,
      label: "Today",
      live: true,
      petCount: 0,
      entries: [],
    };

  const visiblePrevious = showAllDates ? boards : boards.slice(0, 5);

  // Pagination calculations for Full Rankings View
  const totalEntries = activeBoard.entries.length;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE) || 1;
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pagedEntries = activeBoard.entries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6">
        <StatusPill />

        {showFullRankings ? (
          /* Dedicated Full Rankings Page View */
          <div className="mt-4 flex flex-col gap-5">
            {/* Back Button & Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
              <button
                type="button"
                onClick={() => {
                  setShowFullRankings(false);
                  setPage(1);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold transition-colors hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Daily Boards
              </button>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">
                  {activeBoard.label}
                </span>
                {activeBoard.live ? (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-extrabold text-primary-foreground">
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-bold text-muted-foreground">
                    Closed
                  </span>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold leading-tight">
                Full Rankings — {activeBoard.label}
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Showing all ranked pets competing for the top spot on {activeBoard.label}. Total {totalEntries} pets entered.
              </p>
            </div>

            {/* List of Entries in clean row format */}
            {pagedEntries.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground shadow-soft">
                <p className="text-base font-semibold">No entries found for this date.</p>
                <p className="mt-1 text-xs text-muted-foreground">Check back later or enter your pet on the home leaderboard!</p>
              </div>
            ) : (
              <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                {pagedEntries.map((entry) => (
                <div
                  key={entry.pet.id}
                  onClick={() => handleOpenPetDetails(entry.pet, entry.rank)}
                  className="flex items-center gap-4 px-5 py-4 transition-colors cursor-pointer hover:bg-muted/40"
                >
                  <span className="w-9 text-lg font-extrabold text-primary">
                    #{entry.rank}
                  </span>
                  <img
                    src={entry.pet.image}
                    alt={entry.pet.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-border"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="inline-flex items-center gap-1.5 text-base font-bold">
                      {entry.pet.name}
                      {entry.pet.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary" />
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {entry.pet.breed} <span className="px-1">•</span>{" "}
                      {entry.pet.city}, {entry.pet.country}
                    </p>
                    <span className="mt-1 inline-block rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">
                      Owner: {entry.pet.owner}
                    </span>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground line-clamp-1">
                      {entry.pet.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-extrabold text-primary">
                      ${entry.bid}
                    </p>
                    <p className="text-[11px] text-muted-foreground">bid amount</p>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Full Ranks View Pagination Controls (Top 20 items per page) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-3.5 shadow-soft text-sm">
                <p className="text-xs font-semibold text-muted-foreground">
                  Showing <span className="text-foreground">{startIndex + 1}</span>–
                  <span className="text-foreground">
                    {Math.min(startIndex + ITEMS_PER_PAGE, totalEntries)}
                  </span>{" "}
                  of <span className="text-foreground">{totalEntries}</span> pets
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>

                  <span className="px-3 text-xs font-bold text-primary">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-bold transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Standard Daily Page Split View */
          <>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight">Daily</h1>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Each UTC day gets its own board. Rank is what you spent that day.
              <br />
              Today stays live until midnight UTC, then the day closes.
            </p>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
              {/* Left Board View (Selected Date) */}
              <DailyBoard
                board={activeBoard}
                onClaim={() => navigate({ to: "/" })}
                onShowAll={() => {
                  setShowFullRankings(true);
                  setPage(1);
                }}
                onSelectPet={handleOpenPetDetails}
              />

              {/* Right Side Date Selector */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Select Date Board
                </h3>
                {visiblePrevious.map((board) => (
                  <PreviousDayCard
                    key={board.date}
                    board={board}
                    isSelected={selectedDate === board.date}
                    onSelectDate={(date) => setSelectedDate(date)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <button
                type="button"
                aria-label="Previous days"
                onClick={() => setShowAllDates(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span>Showing {visiblePrevious.length} dates</span>
              <button
                type="button"
                aria-label="More days"
                onClick={() => setShowAllDates(true)}
                className="rounded-full p-1.5 transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </>
        )}
      </main>

      {/* Pet Detail Portrait Dialog */}
      <PetDetailModal
        pet={selectedPet}
        rank={selectedRank}
        allPets={activeBoard.entries.map((e) => e.pet)}
        onClose={() => setSelectedPet(null)}
      />

      <Footer />
    </div>
  );
}
