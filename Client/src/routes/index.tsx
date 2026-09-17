import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Leaderboard } from "@/components/Leaderboard";
import { PetDetailModal } from "@/components/PetDetailModal";
import { PetSubmissionForm, COUNTRIES } from "@/components/PetSubmissionForm";
import { StatusPill } from "@/components/StatusPill";
import { mockPets } from "@/data/pets";
import { fetchAllPets, fetchNewPetsApi, incrementPetViewsApi } from "@/lib/api";
import type { FilterKey, Pet } from "@/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pawdium.lol — The Pet Leaderboard" },
      {
        name: "description",
        content:
          "Claim #1 and put your pet in the spotlight. A live, community-ranked leaderboard for dogs, cats, birds and every other very good animal.",
      },
      { property: "og:title", content: "Pawdium.lol — The Pet Leaderboard" },
      {
        property: "og:description",
        content:
          "Claim #1 and put your pet in the spotlight on a live, community-ranked pet leaderboard.",
      },
    ],
  }),
  component: LeaderboardPage,
});

function formatApiPet(p: any): Pet {
  const matchingCountry = COUNTRIES.find(
    (c) => c.name.toLowerCase() === p.country?.toLowerCase()
  );
  return {
    id: p._id || p.id || `${p.petName}-${Date.now()}`,
    name: p.petName,
    tagline: "",
    description: p.about || "Spotlight contestant",
    owner: p.ownerName,
    breed: p.breed || "Standard",
    type: (p.petType as any) || "Dog",
    city: p.city || "Hyderabad",
    country: p.country,
    countryCode: matchingCountry?.code || "IN",
    image: p.imageUrl,
    bid: p.currentBid || 0,
    activity: "Active just now",
    engagement: `${p.views || 0} views`,
    views: p.views || 0,
    rank: p.rank,
    isNew: true,
    createdAt: p.createdAt,
  };
}

function LeaderboardPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [newPets, setNewPets] = useState<Pet[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState({
    name: "India",
    code: "IN",
    flag: "🇮🇳",
  });

  const MIN_CLAIM_PRICE = 1;
  const MAX_CLAIM_PRICE = 10000000; // 10 million

  const [claimPrice, setClaimPrice] = useState<number>(MIN_CLAIM_PRICE);
  const [claimInput, setClaimInput] = useState<string>(MIN_CLAIM_PRICE.toString());
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedRank, setSelectedRank] = useState<number | undefined>(undefined);

  // Fetch backend pets from database
  useEffect(() => {
    async function loadBackendPets() {
      const apiPets = await fetchAllPets();
      if (apiPets && apiPets.length > 0) {
        const formatted: Pet[] = apiPets.map(formatApiPet);
        setPets(formatted);

        // Calculate Rank 1 (highest bid) + 1
        const highestBid = Math.max(0, ...formatted.map((p) => p.bid || 0));
        const newPrice = highestBid + 1;
        setClaimPrice(newPrice);
        setClaimInput(newPrice.toString());
      }
    }
    loadBackendPets();
  }, []);

  // Fetch last 20 new pets when "new" filter is selected
  useEffect(() => {
    if (filter === "new") {
      fetchNewPetsApi().then((apiPets) => {
        if (apiPets && apiPets.length > 0) {
          setNewPets(apiPets.map(formatApiPet));
        }
      });
    }
  }, [filter]);

  const handleStepPrice = (delta: number) => {
    setClaimPrice((prev) => {
      const next = Math.max(MIN_CLAIM_PRICE, Math.min(MAX_CLAIM_PRICE, prev + delta));
      setClaimInput(next.toString());
      return next;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/[^0-9]/g, "");
    setClaimInput(digits);
    if (digits !== "") {
      const val = Number(digits);
      const clamped = Math.min(MAX_CLAIM_PRICE, val);
      setClaimPrice(clamped);
    }
  };

  const handleInputBlur = () => {
    const numeric = Number(claimInput) || 0;
    const finalVal = Math.max(MIN_CLAIM_PRICE, Math.min(MAX_CLAIM_PRICE, numeric));
    setClaimPrice(finalVal);
    setClaimInput(finalVal.toString());
  };

  const handleBid = (petId: string, customAmount?: number) => {
    setPets((prev) =>
      prev.map((p) => {
        if (p.id === petId) {
          const nextBid = customAmount !== undefined ? customAmount : p.bid + 100;
          return { ...p, bid: nextBid };
        }
        return p;
      })
    );
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet((prev) =>
        prev
          ? {
              ...prev,
              bid: customAmount !== undefined ? customAmount : prev.bid + 100,
            }
          : null
      );
    }
  };

  const handleSubmit = (pet: Pet) => {
    setPets((prev) => [...prev, pet]);
    setFilter("new");
  };

  const stepButton =
    "inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary-soft";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6">
        {/* <StatusPill /> */}

        <h1 className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-3xl font-extrabold leading-tight">
          <span>Claim #1 and Spotlight Your Pet for</span>
          <span className="inline-flex items-center gap-1.5 text-primary">
            <button
              type="button"
              aria-label="Lower claim amount"
              onClick={() => handleStepPrice(-1)}
              className={stepButton}
            >
              <Minus className="h-3.5 w-3.5 text-foreground" />
            </button>
            <span className="inline-flex items-baseline">
              <span>$</span>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Claim amount"
                value={claimInput}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="rounded-md bg-transparent text-center outline-none transition-colors focus:bg-primary-soft/50"
                style={{ width: `${Math.max(1, claimInput.length) + 1}ch` }}
              />
            </span>
            <button
              type="button"
              aria-label="Raise claim amount"
              onClick={() => handleStepPrice(1)}
              className={stepButton}
            >
              <Plus className="h-3.5 w-3.5 text-foreground" />
            </button>
          </span>
        </h1>
        <p className="mt-2 text-center text-[15px] text-muted-foreground">
          Add your pet details below to enter the leaderboard. Top pets get more
          visibility and more love!
        </p>

        <div className="mt-5">
          <PetSubmissionForm onSubmit={handleSubmit} claimPrice={claimPrice} pets={pets} />
        </div>

        <div className="mt-5">
          <FilterBar
            active={filter}
            onChange={setFilter}
            selectedCountry={selectedCountryFilter}
            onSelectCountry={setSelectedCountryFilter}
          />
        </div>

        <div className="mt-4">
          <Leaderboard
            pets={filter === "new" ? newPets : pets}
            filter={filter}
            selectedCountryCode={selectedCountryFilter.code}
            onBid={handleBid}
            onSelectPet={(pet, rank) => {
              const currentViews = pet.views ?? 0;
              const optimisticPet = { ...pet, views: currentViews + 1 };
              setSelectedPet(optimisticPet);
              setSelectedRank(rank);

              // Update local list optimistically
              setPets((prev) =>
                prev.map((p) => (p.id === pet.id ? optimisticPet : p))
              );

              // Persist view to database and synchronize
              if (pet.id && !pet.id.startsWith("milo") && !pet.id.startsWith("cleo") && !pet.id.startsWith("apollo")) {
                incrementPetViewsApi(pet.id).then((serverViews) => {
                  if (typeof serverViews === "number") {
                    setPets((prev) =>
                      prev.map((p) =>
                        p.id === pet.id ? { ...p, views: serverViews } : p
                      )
                    );
                    setSelectedPet((prev) =>
                      prev && prev.id === pet.id
                        ? { ...prev, views: serverViews }
                        : prev
                    );
                  }
                });
              }
            }}
          />
        </div>
      </main>

      {/* Pet Detail Portrait Dialog */}
      <PetDetailModal
        pet={selectedPet}
        rank={selectedRank}
        allPets={pets}
        onClose={() => setSelectedPet(null)}
      />

      <Footer />
    </div>
  );
}
