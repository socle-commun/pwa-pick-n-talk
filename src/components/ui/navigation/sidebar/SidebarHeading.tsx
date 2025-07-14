import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function SidebarHeading({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        className,
        "mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400"
      )}
    />
  );
}
