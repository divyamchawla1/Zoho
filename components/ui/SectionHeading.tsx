export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "ink",
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "ink" | "paper";
  /** Use "h1" only when the page has no other h1 — e.g. a top-level index page. */
  level?: "h1" | "h2";
}) {
  const introColor = tone === "paper" ? "text-paper-50/75" : "text-ink-800";
  const titleColor = tone === "paper" ? "text-paper-50" : "text-ink-950";
  const Heading = level;

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`font-mono text-xs uppercase tracking-[0.14em] ${
            tone === "paper" ? "text-paper-50/70" : "text-ink-800/70"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`mt-3 text-balance font-display text-3xl font-semibold sm:text-4xl ${titleColor}`}>
        {title}
      </Heading>
      {intro ? <p className={`mt-4 text-base leading-relaxed ${introColor}`}>{intro}</p> : null}
    </div>
  );
}
