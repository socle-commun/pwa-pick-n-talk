import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label={ariaLabel} {...props} className={cn(className, "flex gap-x-2")} />
}
