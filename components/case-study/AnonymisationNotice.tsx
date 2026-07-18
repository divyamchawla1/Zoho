export function AnonymisationNotice({ notice }: { notice: string }) {
  return (
    <div className="border border-paper-200 bg-paper-100 px-4 py-3">
      <p className="font-mono text-[11px] leading-relaxed text-ink-800/70">{notice}</p>
    </div>
  );
}
