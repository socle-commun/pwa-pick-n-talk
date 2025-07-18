/**
 * SettingsSection – Semantic section for settings page grouping.
 * Provides a consistent, accessible wrapper for grouped settings.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SettingsSection({ title, children, className }: SettingsSectionProps) {
  return (
    <section className={cn("space-y-4", className)} aria-labelledby={title.replace(/\s+/g, "-").toLowerCase()}>
      <h2 id={title.replace(/\s+/g, "-").toLowerCase()} className="text-lg font-semibold text-primary mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
