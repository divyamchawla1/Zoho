export function Eyebrow({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "paper" }) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.14em] ${
        tone === "paper" ? "text-paper-50/70" : "text-ink-800/70"
      }`}
    >
      {children}
    </p>
  );
}
