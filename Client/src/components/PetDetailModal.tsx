import { BadgeCheck, Eye, Loader2, MapPin, Minus, PawPrint, Plus, Share2, Sparkles, Trophy, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { Pet } from "@/types";
import { getCountryFlag } from "./PetCard";
import { ConfirmRankDialog } from "./ConfirmRankDialog";
import { createBidApi } from "@/lib/api";

export function PetDetailModal({
  pet,
  rank,
  allPets = [],
  onClose,
  onBid,
}: {
  pet: Pet | null;
  rank?: number | undefined;
  allPets?: Pet[];
  onClose: () => void;
  onBid?: ((petId: string, customAmount?: number) => void) | undefined;
}) {
  const [boostValue, setBoostValue] = useState<number>(0);
  const [boostInput, setBoostInput] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (pet) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      const initialBoost = pet.bid + 5;
      setBoostValue(initialBoost);
      setBoostInput(initialBoost.toString());
      setConfirmOpen(false);
      setIsSubmitting(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pet, onClose]);

  if (!pet) return null;

  const flag = getCountryFlag(pet.countryCode, pet.country);

  const handleStepBoost = (delta: number) => {
    setBoostValue((prev) => {
      const next = Math.max(pet.bid + 1, prev + delta);
      setBoostInput(next.toString());
      return next;
    });
  };

  const handleBoostInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    setBoostInput(digits);
    if (digits !== "") {
      setBoostValue(Number(digits));
    }
  };

  const handleBoostInputBlur = () => {
    const num = Number(boostInput) || 0;
    const finalVal = Math.max(pet.bid + 1, num);
    setBoostValue(finalVal);
    setBoostInput(finalVal.toString());
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${pet.name} on Pawdium.lol`,
        text: `Check out ${pet.name} on Pawdium.lol leaderboard!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleConfirmBoost = async () => {
    if (!pet) return;
    if (boostValue <= pet.bid) {
      alert(`Boost bid must be higher than current bid of $${pet.bid}`);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await createBidApi(pet.id, boostValue);
      if (res.success && res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
        return;
      } else {
        alert(`Checkout error: ${res.message || "Failed to generate payment session"}`);
        setIsSubmitting(false);
        setConfirmOpen(false);
      }
    } catch (err: any) {
      console.error("Boost bid checkout error:", err);
      alert(`Checkout error: ${err.message || "Could not connect to server"}`);
      setIsSubmitting(false);
      setConfirmOpen(false);
    }
  };

  // Predicted rank calculation based on current pets
  const predictedRank =
    allPets && allPets.length > 0
      ? allPets.filter((p) => p.id !== pet.id && (p.bid || 0) >= boostValue).length + 1
      : (rank || 1);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${pet.name} details`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex h-[calc(100vh-40px)] my-5 w-full max-w-[540px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-in zoom-in-95 duration-200"
        >
          {/* Top Pet Image Section */}
          <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-muted">
            {pet.image ? (
              <img
                src={pet.image}
                alt={pet.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary-soft/40 text-primary">
                <PawPrint className="h-20 w-20 opacity-40" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              aria-label="Close details"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-background/60 p-2 text-foreground backdrop-blur-md transition-all hover:bg-background hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Rank & Status Badges */}
            <div className="absolute left-4 top-4 flex items-center gap-2">
              {rank && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1 text-xs font-extrabold text-primary-foreground shadow-pop">
                  <Trophy className="h-3.5 w-3.5" />
                  Rank #{rank}
                </span>
              )}
              {pet.hallOfFame && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  Hall of Fame
                </span>
              )}
              {pet.isNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  New Star
                </span>
              )}
            </div>

            {/* Bottom Title on Cover: Pet Name & Country */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-extrabold text-foreground drop-shadow-sm">
                    {pet.name}
                  </h2>
                  {pet.verified && (
                    <BadgeCheck className="h-6 w-6 text-primary fill-primary/20" />
                  )}
                </div>
                {/* Country Flag & Country Name below pet name */}
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-bold text-primary drop-shadow-sm">
                  <span className="text-base leading-none">{flag}</span>
                  <span>{pet.country}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Current Bid
                </span>
                <p className="text-3xl font-extrabold text-primary">
                  ${pet.bid.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Detail Body */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {/* Quick Info Grid */}
            <div className="grid grid-cols-3 gap-2.5 rounded-2xl border border-border bg-muted/40 p-3 text-center">
              <div>
                <span className="block text-[11px] font-semibold text-muted-foreground uppercase">
                  Pet Type
                </span>
                <span className="text-sm font-bold text-foreground">
                  {pet.type} ({pet.breed})
                </span>
              </div>
              <div className="border-x border-border/60">
                <span className="block text-[11px] font-semibold text-muted-foreground uppercase">
                  Views
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                  <Eye className="h-3.5 w-3.5 fill-primary/20" />
                  {(pet.views ?? 0).toLocaleString("en-US")} views
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-muted-foreground uppercase">
                  Activity
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  {pet.activity}
                </span>
              </div>
            </div>

            {/* Location & Owner Card */}
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary font-bold">
                  <span className="text-xl leading-none">{flag}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">Location</p>
                  <p className="text-sm font-bold text-foreground">
                    {pet.city}, {pet.country}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-muted-foreground">Proud Owner</p>
                <p className="text-sm font-bold text-primary">{pet.owner}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                About {pet.name}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/90">
                {pet.description}
              </p>
            </div>
          </div>

          {/* Modal Footer Actions: Share + Boost Bid Controls */}
          <div className="shrink-0 border-t border-border bg-card px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-bold transition-colors hover:bg-muted"
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
              Share
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">Boost Bid</span>
              <button
                type="button"
                onClick={() => handleStepBoost(1)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary-soft"
                aria-label="Increase boost bid"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
              <div className="inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-1 text-xs font-extrabold text-primary">
                <span className="mr-0.5">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={boostInput}
                  onChange={handleBoostInputChange}
                  onBlur={handleBoostInputBlur}
                  className="w-16 bg-transparent text-center font-extrabold outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleStepBoost(-1)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary-soft"
                aria-label="Decrease boost bid"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  if (onBid) {
                    onBid(pet.id, boostValue);
                  } else {
                    setConfirmOpen(true);
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-pop transition-all hover:opacity-95 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <PawPrint className="h-3.5 w-3.5" />
                )}
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmRankDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmBoost}
        petName={pet.name}
        category={`${pet.type} · Spotlight leaderboard`}
        rank={predictedRank}
        price={boostValue}
      />
    </>
  );
}

