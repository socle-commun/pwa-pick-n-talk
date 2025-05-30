import {
  type MenuSeparatorProps as HeadlessMenuSeparatorProps,
  MenuSeparator as HeadlessMenuSeparator
} from "@headlessui/react";

import cn from "@/utilities/cn";

export default function DropdownDivider({
  className,
  ...props
}: { className?: string } & Omit<HeadlessMenuSeparatorProps, "as" | "className">) {
  return (
    <HeadlessMenuSeparator
      {...props}
      className={cn(
        className,
        "col-span-full mx-3.5 my-1 h-px border-0 bg-zinc-950/5 sm:mx-3 dark:bg-white/10 forced-colors:bg-[CanvasText]"
      )}
    />
  )
}