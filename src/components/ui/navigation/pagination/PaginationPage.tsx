import { type PropsWithChildren } from "react";

import Button from "@/components/actions/Button";

import cn from "@/utilities/cn";

export function PaginationPage({
  href,
  className,
  current = false,
  children,
}: PropsWithChildren<{ href: string; className?: string; current?: boolean }>) {
  return (
    <Button
      href={href}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      className={cn(
        className,
        "min-w-9 before:absolute before:-inset-px before:rounded-lg",
        current && "before:bg-zinc-950/5 dark:before:bg-white/10"
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  )
}
