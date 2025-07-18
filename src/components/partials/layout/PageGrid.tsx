/**
 * PageGrid – Semantic grid layout for page content, atomic and reusable.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function PageGrid({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-1 lg:grid-cols-2", className)}>{children}</div>
  );
}
