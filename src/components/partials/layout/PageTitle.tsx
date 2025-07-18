/**
 * PageTitle – Semantic h1 for page titles, atomic and reusable.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function PageTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1 className={cn("text-2xl font-bold text-primary", className)}>{children}</h1>
  );
}
