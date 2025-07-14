import { useContext, type ComponentPropsWithoutRef } from "react";

import { TableContext } from "@/components/ui/data-display";

import cn from "@/utils/cn";

export default function TableHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  const { bleed, grid } = useContext(TableContext);

  return (
    <th
      {...props}
      className={cn(
        className,
        "border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-(--gutter,--spacing(2)) last:pr-(--gutter,--spacing(2)) dark:border-b-white/10",
        grid &&
          "border-l border-l-zinc-950/5 first:border-l-0 dark:border-l-white/5",
        !bleed && "sm:first:pl-1 sm:last:pr-1",
      )}
    />
  );
}
