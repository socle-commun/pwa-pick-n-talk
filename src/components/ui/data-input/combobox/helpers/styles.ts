import cn from "@/utils/cn";

export const controlStyles = (className?: string) =>
  cn([
    className,
    // Basic layout
    "relative block w-full",
    // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
    "before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm",
    // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
    "dark:before:hidden",
    // Focus ring
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500",
    // Disabled state
    "has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none",
    // Invalid state
    "has-data-invalid:before:shadow-red-500/10",
  ]);

export const inputStyles = (className?: string) =>
  cn([
    className,
    // Basic layout
    "relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
    // Horizontal padding
    "pr-[calc(--spacing(10)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pr-[calc(--spacing(9)-1px)] sm:pl-[calc(--spacing(3)-1px)]",
    // Typography
    "text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",
    // Border
    "border border-zinc-950/10 data-hover:border-zinc-950/20 dark:border-white/10 dark:data-hover:border-white/20",
    // Background color
    "bg-transparent dark:bg-white/5",
    // Hide default focus styles
    "focus:outline-hidden",
    // Invalid state
    "data-invalid:border-red-500 data-invalid:data-hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:data-hover:border-red-500",
    // Disabled state
    "data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/2.5 dark:data-hover:data-disabled:border-white/15",
    // System icons
    "dark:scheme-dark",
  ]);

export const optionsStyles = cn(
  // Anchor positioning
  "[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(4)] sm:data-[anchor~=start]:[--anchor-offset:-4px]",
  // Base styles,
  "isolate min-w-[calc(var(--input-width)+8px)] scroll-py-1 rounded-xl p-1 select-none empty:invisible",
  // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
  "outline outline-transparent focus:outline-hidden",
  // Handle scrolling when menu won't fit in viewport
  "overflow-y-scroll overscroll-contain",
  // Popover background
  "bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75",
  // Shadows
  "shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset",
  // Transitions
  "transition-opacity duration-100 ease-in data-closed:data-leave:opacity-0 data-transition:pointer-events-none"
);
