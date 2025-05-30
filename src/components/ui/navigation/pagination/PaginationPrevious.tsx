import { type PropsWithChildren } from "react";

import Button from "@/components/actions/Button";

import cn from "@/utilities/cn";

export default function PaginationPrevious({
  href = null,
  className,
  children = "Previous",
}: PropsWithChildren<{ href?: string | null; className?: string }>) {
  return (
    <span className={cn(className, "grow basis-0")}>
      <Button {...(href === null ? { disabled: true } : { href })} plain aria-label="Previous page">
        <svg className="stroke-current" data-slot="icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  )
}
