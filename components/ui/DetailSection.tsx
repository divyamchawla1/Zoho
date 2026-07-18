import type { ReactNode } from "react";

export function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-paper-200 py-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-2xl font-semibold text-ink-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
