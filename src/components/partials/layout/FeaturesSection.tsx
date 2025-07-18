/**
 * FeaturesSection – Sémantique et centralisation de la section features de la home page.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function FeaturesSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section id="features" className={cn("py-16", className)} data-slot="features-section">
      {children}
    </section>
  );
}
