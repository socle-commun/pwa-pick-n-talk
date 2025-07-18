/**
 * PageSection – Semantic section for main content grouping in pages.
 * Provides a consistent, accessible wrapper for grouped content.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export interface PageSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function PageSection({ title, children, className }: PageSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {title && (
        <h2 className="text-lg font-semibold text-primary mb-4">{title}</h2>
      )}
      {children}
    </section>
  );
}
