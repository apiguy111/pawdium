import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-accent" />
          <span className="text-sm font-bold">Pawdium.lol</span>
          <span className="text-sm text-muted-foreground">
            · the leaderboard your pet deserves
          </span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Leaderboard
          </Link>
          <Link to="/daily" className="hover:text-foreground">
            Daily
          </Link>
          <Link to="/about" className="hover:text-foreground">
            About Us
          </Link>
          <Link to="/rules" className="hover:text-foreground">
            Rules
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
