/**
 * HeroSection – Sémantique et centralisation du hero de la home page.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function HeroSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("text-center py-12 mb-16", className)} data-slot="hero-section">
      {children}
    </section>
  );
}
