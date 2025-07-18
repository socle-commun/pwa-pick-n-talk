/**
 * BinderEditSection – Semantic wrapper for binder edit form.
 */
import type { ReactNode } from "react";
import cn from "@/utils/cn";

export default function BinderEditSection({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("max-w-2xl mx-auto space-y-8", className)} data-slot="binder-edit-section">
      {children}
    </section>
  );
}
