import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Link as LinkType } from "@/schemas/content-types";

type Props = {
  name: string;
  primaryTitle: string;
  locationDisplay: string;
  footerNav: LinkType[];
  anonymisationNotice: string;
};

export function SiteFooter({ name, primaryTitle, locationDisplay, footerNav, anonymisationNotice }: Props) {
  return (
    <footer className="border-t border-paper-200 bg-paper-100">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-lg font-semibold text-ink-950">{name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-800/70">{primaryTitle}</p>
          <p className="mt-4 max-w-xs text-sm text-ink-800">{locationDisplay}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-5">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-950 hover:text-accent-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="max-w-xs text-xs leading-relaxed text-ink-800/80">{anonymisationNotice}</p>
        </div>
      </Container>

      <div className="border-t border-paper-200">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-800/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{name}</p>
          <p>All client work described here is anonymised.</p>
        </Container>
      </div>
    </footer>
  );
}
