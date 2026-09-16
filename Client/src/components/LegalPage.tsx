import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({
  title,
  effective,
  children,
}: {
  title: string;
  effective?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[760px] px-6 pb-8 pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        {effective && (
          <p className="mt-2 text-sm text-muted-foreground">{effective}</p>
        )}
        <div className="legal-body mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4 flex flex-col gap-3">
      <h2 className="text-lg font-bold text-foreground">{heading}</h2>
      {children}
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
