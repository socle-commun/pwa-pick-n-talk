import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function PaginationList({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={cn(className, "hidden items-baseline gap-x-2 sm:flex")} />
}
