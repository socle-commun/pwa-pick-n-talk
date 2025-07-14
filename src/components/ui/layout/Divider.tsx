import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      role="presentation"
      {...props}
      className={cn(
        className,
        "w-full border-t",
        soft && "border-zinc-950/5 dark:border-white/5",
        !soft && "border-zinc-950/10 dark:border-white/10",
      )}
    />
  );
}
