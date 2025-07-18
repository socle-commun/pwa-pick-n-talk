/**
 * AuthCard – Centralized layout for authentication pages.
 * Replaces raw divs in auth pages for consistent style.
 */
import cn from "@/utils/cn";
import type { ReactNode } from "react";

export interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <section
      className={cn(
        "bg-zinc-200 dark:bg-zinc-800 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 w-full max-w-[480px] mx-auto",
        className
      )}
      data-slot="auth-card"
    >
      {children}
    </section>
  );
}
