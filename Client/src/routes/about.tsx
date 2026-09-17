import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, PawPrint, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import founder from "@/assets/founder.png";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatCard } from "@/components/StatCard";
import { StatusPill } from "@/components/StatusPill";
import { fetchPetStatsApi, type PetStatsData } from "@/lib/api";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Pawdium.lol" },
      {
        name: "description",
        content:
          "Pawdium.lol is a community-run pet leaderboard: no ads, no paywalls, just pets, their people and one very simple rule.",
      },
      { property: "og:title", content: "About Us — Pawdium.lol" },
      {
        property: "og:description",
        content:
          "A community-run pet leaderboard with one very simple rule — you decide who gets the spotlight.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [stats, setStats] = useState<PetStatsData | null>(null);

  useEffect(() => {
    let isMounted = true;
    fetchPetStatsApi().then((data) => {
      if (isMounted && data) {
        setStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1200px] px-6">
        <StatusPill />

        <div className="mx-auto mt-5 max-w-[880px]">
          <h1 className="text-3xl font-extrabold leading-tight">About Us</h1>
          <h2 className="mt-2 text-xl font-bold">
            <span className="text-primary">Made for pets.</span> Run by their people.
          </h2>
          <p className="mt-3 max-w-[720px] text-[15px] leading-relaxed text-muted-foreground">
            Pawdium.lol started as a small weekend experiment built around one
            stubborn idea: let the community pick who stands at the top. No ads, no clever tricks. Just you, your pet, and a shot at the number one
            spot.
          </p>

          <div className="mt-4 rounded-xl border border-primary/20 bg-primary-soft/35 px-4 py-3.5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft">
                <PawPrint className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-bold">
                  The rules stay simple, today and always:
                </p>
                <p className="mt-0.5 text-[13px] text-muted-foreground">
                  Your rank is whatever you bid — nothing hidden, nothing else counted.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-[1010px]">
          <h2 className="text-xl font-bold">Our Journey So Far</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From a tiny side project to a global pet community in record time.
          </p>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <StatCard
              icon={PawPrint}
              value={stats ? stats.totalPets.toLocaleString("en-US") : "..."}
              label="Pets on Pawdium"
              hint="Every one has a story to tell"
              tone="primary"
            />
            <StatCard
              icon={DollarSign}
              value={stats ? `$${stats.totalBids.toLocaleString("en-US")}` : "..."}
              label="Total Bids"
              hint="In spotlight auctions"
              tone="accent"
            />
            <StatCard
              icon={Star}
              value={stats ? `$${stats.highestBid.toLocaleString("en-US")}` : "..."}
              label="Highest Bid So Far"
              hint="For a moment in the spotlight"
              tone="gold"
            />
          </div>

          <h2 className="mt-7 text-xl font-bold">More Than Numbers</h2>
          <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-muted-foreground">
            We've met thousands of wonderful animals, read a lot of stories that made us
            grin, and watched a community form around celebrating pets in the silliest
            possible way.
          </p>
          <p className="mt-2 max-w-[640px] text-sm leading-relaxed text-muted-foreground">
            The warmth from pet parents like you is the reason this keeps going.
          </p>

          <hr className="mt-6 border-border" />

          <div className="mt-5 flex flex-wrap items-start gap-5 pb-3">
            <img
              src={founder}
              alt="Portrait of the Pawdium.lol founder"
              loading="lazy"
              width={512}
              height={512}
              className="h-[104px] w-[104px] rounded-full object-cover ring-1 ring-border"
            />
            <div className="min-w-0 max-w-[640px]">
              <p className="text-[13px] font-bold text-primary">Founder</p>
              <p className="mt-0.5 text-[15px] font-bold">
                Kuwar Shiv Pratap Singh{" "}
                <span className="ml-2 font-semibold text-accent">@apiguy111</span>
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                An independent maker building small internet products
                for people and their animals.
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Building in the open and enjoying every minute of it. 🐾
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
