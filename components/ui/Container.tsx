import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-[var(--content-max)] px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
