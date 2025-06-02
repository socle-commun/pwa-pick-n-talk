import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={cn(className, "w-9 text-center text-sm/6 font-semibold text-zinc-950 select-none dark:text-white")}
    >
      {children}
    </span>
  )
}
