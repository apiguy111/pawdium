import { Link, useRouterState } from "@tanstack/react-router";
import { Loader2, Moon, PawPrint, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { searchPetsApi, type PetApiData } from "@/lib/api";

const NAV = [
  { label: "Leaderboard", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Daily", to: "/daily" },
] as const;

function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("spotlight-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("spotlight-theme", next ? "dark" : "light");
      return next;
    });
  };

  return { dark, toggle };
}

export function Header() {
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PetApiData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const data = await searchPetsApi(trimmed);
      setResults(data);
      setIsSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <header className="relative">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <PawPrint className="h-7 w-7 text-accent" strokeWidth={2.2} />
          <span className="text-xl font-extrabold tracking-tight">Pawdium.lol</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${active
                    ? "bg-primary-soft text-primary"
                    : "text-foreground hover:bg-muted"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}

          <span className="mx-3 h-6 w-px bg-border" />

          <button
            type="button"
            aria-label="Search pets"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2.5 text-foreground transition-colors hover:bg-muted"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggle}
            className="rounded-full p-2.5 text-foreground transition-colors hover:bg-muted"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {searchOpen && (
        <div className="mx-auto max-w-[1200px] px-6 pb-3">
          <div className="ml-auto w-full max-w-md surface-card p-3">
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pets by name…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {query.trim() && (
              <div className="mt-2 max-h-64 overflow-auto">
                {isSearching ? (
                  <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Searching pets...
                  </div>
                ) : results.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-muted-foreground">
                    No pets found.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {results.map((pet) => {
                      const petId = pet._id || pet.id || pet.petName;
                      return (
                        <li
                          key={petId}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-muted cursor-pointer"
                        >
                          <img
                            src={pet.imageUrl}
                            alt={pet.petName}
                            loading="lazy"
                            className="h-9 w-9 rounded-full object-cover ring-1 ring-border"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {pet.petName}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                · by {pet.ownerName}
                              </span>
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {pet.breed || pet.petType} · {pet.city}, {pet.country}
                            </p>
                          </div>
                          <span className="ml-auto text-sm font-bold text-primary shrink-0">
                            ${(pet.currentBid || 0).toLocaleString("en-US")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
