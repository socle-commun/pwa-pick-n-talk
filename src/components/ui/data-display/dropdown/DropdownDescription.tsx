import {
  type DescriptionProps as HeadlessDescriptionProps,
  Description as HeadlessDescription
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function DropdownDescription({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDescriptionProps, "as" | "className">) {
  return (
    <HeadlessDescription
      data-slot="description"
      {...props}
      className={cn(
        className,
        "col-span-2 col-start-2 row-start-2 text-sm/5 text-zinc-500 group-data-focus:text-white sm:text-xs/5 dark:text-zinc-400 forced-colors:group-data-focus:text-[HighlightText]"
      )}
    />
  )
}