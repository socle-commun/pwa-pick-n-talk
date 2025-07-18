/**
 * BinderPageSection – Semantic wrapper for binder content and error boundary.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function BinderPageSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("max-w-3xl mx-auto space-y-8", className)} data-slot="binder-page-section">
      {children}
    </section>
  );
}
