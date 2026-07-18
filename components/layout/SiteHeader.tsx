"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Link as LinkType } from "@/schemas/content-types";
import { Container } from "@/components/ui/Container";

type Props = {
  name: string;
  primaryTitle: string;
  nav: LinkType[];
  contactCta: LinkType;
};

const subscribeNoop = () => () => {};

/** True once past hydration — see components/home/HeroTransformation.tsx for why. */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export function SiteHeader({ name, primaryTitle, nav, contactCta }: Props) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const pathname = usePathname();
  const dialogId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the mobile sheet when the route changes. Adjusting state during
  // render (rather than in an effect) avoids the extra cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const toggleButton = toggleRef.current;
    firstLinkRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      (previouslyFocused ?? toggleButton)?.focus();
    };
  }, [open]);

  const dialog =
    open && mounted
      ? createPortal(
          <div
            id={dialogId}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950 p-6 text-paper-50 xl:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold">{name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border border-paper-50 px-3 py-2 font-mono text-xs uppercase tracking-wide"
              >
                Close
              </button>
            </div>

            <nav aria-label="Primary" className="mt-10 flex flex-1 flex-col gap-6">
              {nav.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`font-display text-3xl font-semibold ${
                      active ? "text-accent-400" : "text-paper-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href={contactCta.href}
              className="border border-paper-50 px-4 py-3 text-center font-mono text-sm uppercase tracking-wide"
            >
              {contactCta.label}
            </Link>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-paper-200 bg-paper-50/95 backdrop-blur supports-[backdrop-filter]:bg-paper-50/80">
        <Container className="flex items-center justify-between py-4">
          <Link href="/" className="flex shrink-0 flex-col leading-tight">
            <span className="font-display text-base font-semibold text-ink-950">{name}</span>
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-800/70">
              {primaryTitle}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap font-mono text-sm uppercase tracking-wide transition-colors hover:text-accent-text ${
                    active ? "text-accent-text" : "text-ink-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 xl:block">
            <Link
              href={contactCta.href}
              className="whitespace-nowrap border border-ink-950 px-4 py-2 font-mono text-sm uppercase tracking-wide text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-50"
            >
              {contactCta.label}
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={dialogId}
            className="flex shrink-0 items-center gap-2 border border-ink-950 px-3 py-2 font-mono text-xs uppercase tracking-wide text-ink-950 xl:hidden"
          >
            Menu
          </button>
        </Container>
      </header>

      {dialog}
    </>
  );
}
