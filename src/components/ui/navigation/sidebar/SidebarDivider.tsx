import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function SidebarDivider({
  className,
  ...props
}: ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      {...props}
      className={cn(
        className,
        "my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5"
      )}
    />
  );
}
