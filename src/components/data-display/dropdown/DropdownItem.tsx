import {
  type MenuItemProps as HeadlessMenuItemProps,
  MenuItem as HeadlessMenuItem
} from "@headlessui/react";

import Link from "@/components/navigation/Link";

import cn from "@/utilities/cn";

export default function DropdownItem({
  className,
  ...props
}: { className?: string } & (
  | Omit<HeadlessMenuItemProps<"button">, "as" | "className">
  | Omit<HeadlessMenuItemProps<typeof Link>, "as" | "className">
)) {
  const classes = cn(
    className,
    // Base styles
    "group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5",
    // Text styles
    "text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
    // Focus
    "data-focus:bg-blue-500 data-focus:text-white",
    // Disabled state
    "data-disabled:opacity-50",
    // Forced colors mode
    "forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText] forced-colors:data-focus:*:data-[slot=icon]:text-[HighlightText]",
    // Use subgrid when available but fallback to an explicit grid layout if not
    "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
    // Icons
    "*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:mr-2 sm:*:data-[slot=icon]:size-4",
    "*:data-[slot=icon]:text-zinc-500 data-focus:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400 dark:data-focus:*:data-[slot=icon]:text-white",
    // Avatar
    "*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5"
  )

  return "href" in props ? (
    <HeadlessMenuItem as={Link} {...props} className={classes} />
  ) : (
    <HeadlessMenuItem as="button" type="button" {...props} className={classes} />
  )
}