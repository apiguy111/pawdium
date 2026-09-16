import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function ConfirmRankDialog({
  open,
  onClose,
  onConfirm,
  petName,
  category,
  rank,
  price,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  petName: string;
  category: string;
  rank: number;
  price: number;
}) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!open) setAgreed(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirm this rank"
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-border bg-card shadow-pop"
      >
        <div className="relative px-6 pt-5">
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-bold">Confirm this rank</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Check the rank and price, then agree to the Terms of Service to continue.
          </p>

          <div className="mt-4 rounded-xl border border-border bg-muted/60 px-4 py-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Rank
                </p>
                <p className="text-2xl font-extrabold">#{rank}</p>
                <p className="text-xs text-muted-foreground">{category}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Price
                </p>
                <p className="text-2xl font-extrabold text-primary">
                  ${price.toLocaleString("en-US")}
                </p>
                <p className="text-xs text-muted-foreground">Due now</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {petName || "Your pet"} gets a listing at that rank on the public
            leaderboard. It goes live when the entry confirms. Someone else can
            claim a higher rank.
          </p>

          <label className="mt-4 flex items-start gap-3 rounded-xl border border-border bg-muted/60 px-4 py-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[var(--color-primary)] cursor-pointer"
            />
            <span>
              I have read and agree to the{" "}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline cursor-pointer"
              >
                Terms of Service
              </Link>{" "}
              of Spotlight.lol
            </span>
          </label>

          <p className="mt-3 text-sm text-muted-foreground">
            <Link to="/privacy" className="underline hover:text-foreground">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link to="/rules" className="underline hover:text-foreground">
              Rules
            </Link>
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-border px-5 py-2 text-sm font-bold transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!agreed}
            onClick={onConfirm}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-45 cursor-pointer"
          >
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
