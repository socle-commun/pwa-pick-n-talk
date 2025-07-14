import {
  type SwitchProps as HeadlessSwitchProps,
  Switch as HeadlessSwitch,
} from "@headlessui/react";

import cn from "@/utils/cn";
import { colors, type Color } from "./switches/colors";

export default function Switch({
  color = "dark/zinc",
  className,
  ...props
}: {
  color?: Color;
  className?: string;
} & Omit<HeadlessSwitchProps, "as" | "className" | "children">) {
  return (
    <HeadlessSwitch
      data-slot="control"
      {...props}
      className={cn(
        className,
        // Base styles
        "group relative isolate inline-flex h-6 w-10 cursor-default rounded-full p-[3px] sm:h-5 sm:w-8",
        // Transitions
        "transition duration-0 ease-in-out data-changing:duration-200",
        // Outline and background color in forced-colors mode so switch is still visible
        "forced-colors:outline forced-colors:[--switch-bg:Highlight] dark:forced-colors:[--switch-bg:Highlight]",
        // Unchecked
        "bg-zinc-200 ring-1 ring-black/5 ring-inset dark:bg-white/5 dark:ring-white/15",
        // Checked
        "data-checked:bg-(--switch-bg) data-checked:ring-(--switch-bg-ring) dark:data-checked:bg-(--switch-bg) dark:data-checked:ring-(--switch-bg-ring)",
        // Focus
        "focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500",
        // Hover
        "data-hover:ring-black/15 data-hover:data-checked:ring-(--switch-bg-ring)",
        "dark:data-hover:ring-white/25 dark:data-hover:data-checked:ring-(--switch-bg-ring)",
        // Disabled
        "data-disabled:bg-zinc-200 data-disabled:opacity-50 data-disabled:data-checked:bg-zinc-200 data-disabled:data-checked:ring-black/5",
        "dark:data-disabled:bg-white/15 dark:data-disabled:data-checked:bg-white/15 dark:data-disabled:data-checked:ring-white/15",
        // Color specific styles
        colors[color]
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          // Basic layout
          "pointer-events-none relative inline-block size-4.5 rounded-full sm:size-3.5",
          // Transition
          "translate-x-0 transition duration-200 ease-in-out",
          // Invisible border so the switch is still visible in forced-colors mode
          "border border-transparent",
          // Unchecked
          "bg-white shadow-sm ring-1 ring-black/5",
          // Checked
          "group-data-checked:bg-(--switch) group-data-checked:shadow-(--switch-shadow) group-data-checked:ring-(--switch-ring)",
          "group-data-checked:translate-x-4 sm:group-data-checked:translate-x-3",
          // Disabled
          "group-data-checked:group-data-disabled:bg-white group-data-checked:group-data-disabled:shadow-sm group-data-checked:group-data-disabled:ring-black/5"
        )}
      />
    </HeadlessSwitch>
  );
}
