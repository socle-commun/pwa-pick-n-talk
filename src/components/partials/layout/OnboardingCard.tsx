/**
 * OnboardingCard – Centralized layout for onboarding/setup pages.
 * Replaces raw divs in pages for consistent style.
 */
import cn from "@/utils/cn";
import { ReactNode } from "react";

export interface OnboardingCardProps {
  children: ReactNode;
  className?: string;
}

export default function OnboardingCard({ children, className }: OnboardingCardProps) {
  return (
    <section
      className={cn(
        "w-full max-w-2xl mx-auto flex flex-col items-center bg-gradient-to-br from-sky-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-800 rounded-lg p-8 shadow-lg",
        className
      )}
      data-slot="onboarding-card"
    >
      {children}
    </section>
  );
}
