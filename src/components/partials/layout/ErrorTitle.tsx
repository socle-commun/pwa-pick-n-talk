/**
 * ErrorTitle – Semantic, accessible error title for error/404 pages.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function ErrorTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="heading" aria-level={1} className={cn("mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl", className)}>
      {children}
    </div>
  );
}
