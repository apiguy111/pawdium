import { Clock, Eye, Globe, PawPrint } from "lucide-react";
import type { Pet } from "@/types";

export const getCountryFlag = (code?: string, countryName?: string) => {
  if (code === "IN" || countryName === "India") return "🇮🇳";
  if (code === "JP" || countryName === "Japan") return "🇯🇵";
  if (code === "AE" || countryName === "UAE") return "🇦🇪";
  if (code === "PT" || countryName === "Portugal") return "🇵🇹";
  if (code === "US" || countryName === "United States") return "🇺🇸";
  if (code === "GB" || countryName === "United Kingdom") return "🇬🇧";
  if (code === "CA" || countryName === "Canada") return "🇨🇦";
  if (code === "AU" || countryName === "Australia") return "🇦🇺";
  if (code === "DE" || countryName === "Germany") return "🇩🇪";
  if (code === "FR" || countryName === "France") return "🇫🇷";
  if (code === "ES" || countryName === "Spain") return "🇪🇸";
  if (code === "IT" || countryName === "Italy") return "🇮🇹";
  if (code === "BR" || countryName === "Brazil") return "🇧🇷";
  return "🌐";
};

function getRelativeTime(dateStr?: string): string {
  if (!dateStr) return "Active just now";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Active just now";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return diffMins === 1 ? "1 minute ago" : `${diffMins} minutes ago`;
  if (diffHours < 24) return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks < 5) return `${diffWeeks} weeks ago`;
  if (diffMonths === 1) return "1 month ago";
  if (diffMonths < 12) return `${diffMonths} months ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
}

export function PetCard({
  pet,
  rank,
  onBid,
  onSelect,
}: {
  pet: Pet;
  rank: number;
  onBid?: (petId: string) => void;
  onSelect?: (pet: Pet) => void;
}) {
  const top = rank === 1;
  const flag = getCountryFlag(pet.countryCode, pet.country);
  const bidTime = getRelativeTime(pet.createdAt);

  return (
    <article
      onClick={() => onSelect?.(pet)}
      className={`flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3.5 transition-all cursor-pointer ${
        top
          ? "border-primary/25 bg-primary-soft/25 shadow-card hover:shadow-lg"
          : "border-border shadow-soft hover:shadow-card hover:border-primary/40"
      }`}
    >
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <div
          className={`mt-0.5 inline-flex h-7 min-w-9 items-center justify-center rounded-full px-2.5 text-xs font-bold shrink-0 ${
            top
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          #{rank}
        </div>

        <img
          src={pet.image}
          alt={pet.name}
          loading="lazy"
          width={512}
          height={512}
          className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-border"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-bold">
            {pet.name} <span className="text-muted-foreground">·</span> {pet.tagline}
          </h3>
          <p className="mt-0.5 max-w-3xl text-[13px] leading-snug text-muted-foreground line-clamp-1">
            {pet.description}
          </p>
          <p className="mt-0.5 text-[13px] font-medium text-foreground/80">By Owner {pet.owner}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium">
              <PawPrint className="h-3 w-3 text-primary" /> {pet.breed}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <span>{flag}</span> {pet.country}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Globe className="h-3 w-3" /> {pet.city}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1 font-semibold text-primary">
              <Eye className="h-3 w-3 fill-primary/20" /> {(pet.views ?? 0).toLocaleString("en-US")} views
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {bidTime}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end pl-2">
        <span className="text-lg font-extrabold text-primary">
          ${pet.bid.toLocaleString("en-US")}
        </span>
      </div>
    </article>
  );
}
