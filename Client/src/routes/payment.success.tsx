import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Trophy, Sparkles, Home, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/payment/success")({
  head: () => ({
    meta: [
      { title: "Payment Successful — Spotlight.lol" },
      {
        name: "description",
        content: "Your payment was processed successfully. Welcome to the leaderboard!",
      },
    ],
  }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate({ to: "/" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-[600px] px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">
        <div className="relative mb-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="h-14 w-14 text-primary" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-7 w-7 text-amber-500 animate-bounce" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-extrabold text-primary mb-3">
          <Trophy className="h-3.5 w-3.5" />
          Rank Claim Confirmed!
        </span>

        <h1 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
          Payment Successful!
        </h1>

        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Your payment was processed through Dodo Payments. Your pet's bid has been recorded and the leaderboard ranking is being updated.
        </p>

        <div className="mt-6 w-full rounded-2xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Status
          </p>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm font-bold text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Confirmed &amp; Live on Leaderboard
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Redirecting to the leaderboard in{" "}
            <span className="font-bold text-primary">{countdown}s</span>...
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-pop transition-transform hover:scale-105"
          >
            <Home className="h-4 w-4" />
            View Leaderboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
