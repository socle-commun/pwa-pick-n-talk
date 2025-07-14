import {
  type MenuItemsProps as HeadlessMenuItemsProps,
  MenuItems as HeadlessMenuItems
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function DropdownMenu({
  anchor = "bottom",
  className,
  ...props
}: { className?: string } & Omit<HeadlessMenuItemsProps, "as" | "className">) {
  return (
    <HeadlessMenuItems
      {...props}
      transition
      anchor={anchor}
      className={cn(
        className,
        // Anchor positioning
        "[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]",
        // Base styles
        "isolate w-max rounded-xl p-1",
        // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
        "outline outline-transparent focus:outline-hidden",
        // Handle scrolling when menu won"t fit in viewport
        "overflow-y-auto",
        // Popover background
        "bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75",
        // Shadows
        "shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset",
        // Define grid at the menu level if subgrid is supported
        "supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
        // Transitions
        "transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0"
      )}
    />
  )
}