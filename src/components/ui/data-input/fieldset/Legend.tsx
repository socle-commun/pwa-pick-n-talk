import {
  type LegendProps as HeadlessLegendProps,
  Legend as HeadlessLegend
} from "@headlessui/react";

import cn from "@/utilities/cn";

export default function Legend({
  className,
  ...props
}: { className?: string } & Omit<HeadlessLegendProps, "as" | "className">) {
  return (
    <HeadlessLegend
      data-slot="legend"
      {...props}
      className={cn(
        className,
        "text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    />
  )
}