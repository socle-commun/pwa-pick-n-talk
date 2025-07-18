/**
 * BindersSection – Semantic wrapper for binders list and error boundary.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function BindersSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("max-w-4xl mx-auto space-y-8", className)} data-slot="binders-section">
      {children}
    </section>
  );
}
