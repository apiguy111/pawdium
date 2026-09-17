import { Bird, CalendarDays, Cat, Check, ChevronDown, Dog, PawPrint, Search, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FilterKey } from "@/types";
import { COUNTRIES } from "./PetSubmissionForm";

const FILTERS: { key: FilterKey; label: string; icon: React.ElementType }[] = [
  { key: "all", label: "All Pets", icon: PawPrint },
  { key: "dogs", label: "Dogs", icon: Dog },
  { key: "cats", label: "Cats", icon: Cat },
  { key: "birds", label: "Birds", icon: Bird },
  { key: "new", label: "New Entries", icon: CalendarDays },
  // { key: "hall", label: "Hall of Fame", icon: Trophy },
];

export interface CountryFilterItem {
  name: string;
  code: string;
  flag: string;
}

export function FilterBar({
  active,
  onChange,
  selectedCountry,
  onSelectCountry,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
  selectedCountry: CountryFilterItem;
  onSelectCountry: (country: CountryFilterItem) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(({ key, label, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        );
      })}

      {/* Custom Country Dropdown List on Right */}
      <div className="relative ml-auto" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
            active === "country"
              ? "border-primary bg-primary-soft text-primary font-bold shadow-sm"
              : "border-border bg-card text-foreground hover:bg-muted"
          }`}
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span>{selectedCountry.name}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full z-50 mt-1.5 w-56 max-h-64 overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-pop animate-in fade-in zoom-in-95 duration-150 flex flex-col">
            <div className="relative px-1 pb-1.5 border-b border-border mb-1">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md bg-muted/60 pl-8 pr-2 py-1 text-xs outline-none focus:bg-muted"
              />
            </div>

            <div className="overflow-y-auto flex-1 flex flex-col gap-0.5">
              {filteredCountries.length === 0 ? (
                <p className="p-3 text-center text-xs text-muted-foreground">
                  No matching country
                </p>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = selectedCountry.code === c.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        onSelectCountry(c);
                        onChange("country");
                        setDropdownOpen(false);
                        setSearchQuery("");
                      }}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors hover:bg-muted ${
                        isSelected
                          ? "bg-primary-soft text-primary font-bold"
                          : "text-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base leading-none">{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
