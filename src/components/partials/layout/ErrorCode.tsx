/**
 * ErrorCode – Semantic, accessible error code for error/404 pages.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function ErrorCode({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-3xl font-semibold", className)} aria-label="Error code">
      {children}
    </div>
  );
}
