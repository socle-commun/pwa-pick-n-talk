import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function NavbarDivider({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" {...props} className={cn(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")} />
}