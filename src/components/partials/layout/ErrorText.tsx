/**
 * ErrorText – Semantic, accessible error text for error/404 pages.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function ErrorText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mt-6 text-lg font-medium text-pretty text-zinc-500 sm:text-xl/8", className)}>
      {children}
    </div>
  );
}
