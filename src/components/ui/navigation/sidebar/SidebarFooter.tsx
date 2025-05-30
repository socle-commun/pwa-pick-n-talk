import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function SidebarFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        className,
        "flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5"
      )}
    />
  )
}
