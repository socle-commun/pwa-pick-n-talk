import {
  type MenuHeadingProps as HeadlessMenuHeadingProps,
  MenuHeading as HeadlessMenuHeading
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function DropdownHeading({
  className,
  ...props
}: { className?: string } & Omit<HeadlessMenuHeadingProps, "as" | "className">) {
  return (
    <HeadlessMenuHeading
      {...props}
      className={cn(
        className,
        "col-span-full grid grid-cols-[1fr_auto] gap-x-12 px-3.5 pt-2 pb-1 text-sm/5 font-medium text-zinc-500 sm:px-3 sm:text-xs/5 dark:text-zinc-400"
      )}
    />
  )
}