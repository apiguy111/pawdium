import type { LucideIcon } from "lucide-react";

type Tone = "primary" | "accent" | "gold";

const tones: Record<Tone, { chip: string; value: string; line: string }> = {
  primary: {
    chip: "bg-primary-soft text-primary",
    value: "text-primary",
    line: "stroke-[var(--color-primary)]",
  },
  accent: {
    chip: "bg-accent-soft text-accent",
    value: "text-accent",
    line: "stroke-[var(--color-accent)]",
  },
  gold: {
    chip: "bg-gold-soft text-gold",
    value: "text-gold",
    line: "stroke-[var(--color-gold)]",
  },
};

export function StatCard({
  icon: Icon,
  value,
  label,
  hint,
  tone = "primary",
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  hint: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-soft">
      <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.chip}`}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-xl font-extrabold ${t.value}`}>{value}</p>
        <p className="text-[13px] font-semibold">{label}</p>
        <p className="text-[12px] text-muted-foreground">{hint}</p>
      </div>
      <svg viewBox="0 0 60 24" className="h-8 w-16 shrink-0" fill="none" aria-hidden>
        <path
          d="M1 20 L12 15 L20 18 L30 8 L40 12 L50 4 L59 6"
          className={t.line}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
