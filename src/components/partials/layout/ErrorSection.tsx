/**
 * ErrorSection – Semantic wrapper for error/404 pages.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function ErrorSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("w-full max-w-xl mx-auto py-24 text-center", className)} data-slot="error-section">
      {children}
    </section>
  );
}
