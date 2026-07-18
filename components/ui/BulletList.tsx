export function BulletList({ items, tone = "ink" }: { items: string[]; tone?: "ink" | "danger" | "accent" }) {
  const border = tone === "danger" ? "border-danger-500" : tone === "accent" ? "border-accent-500" : "border-ink-800/30";

  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className={`border-l-2 ${border} pl-3 text-sm leading-relaxed text-ink-800`}>
          {item}
        </li>
      ))}
    </ul>
  );
}
