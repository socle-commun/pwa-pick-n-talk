import type { ReactNode } from "react";

import cn from "@/utilities/cn";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className={cn("min-h-dvh p-2 flex flex-col")}>
      <div
        className={cn(
          "flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10",
        )}
      >
        {children}
      </div>
    </main>
  );
}
