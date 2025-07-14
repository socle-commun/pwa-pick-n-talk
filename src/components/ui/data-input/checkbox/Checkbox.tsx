import {
  type CheckboxProps as HeadlessCheckboxProps,
  Checkbox as HeadlessCheckbox,
} from "@headlessui/react";

import cn from "@/utils/cn";
import { base, colors, type Color } from "./checkbox.styles";

export default function Checkbox({
  color = "dark/zinc",
  className,
  ...props
}: {
  color?: Color;
  className?: string;
} & Omit<HeadlessCheckboxProps, "as" | "className">) {
  return (
    <HeadlessCheckbox
      data-slot="control"
      {...props}
      className={cn(className, "group inline-flex focus:outline-hidden")}
    >
      <span className={cn([base, colors[color]])}>
        <svg
          className="size-4 stroke-(--checkbox-check) opacity-0 group-data-checked:opacity-100 sm:h-3.5 sm:w-3.5"
          viewBox="0 0 14 14"
          fill="none"
        >
          {/* Checkmark icon */}
          <path
            className="opacity-100 group-data-indeterminate:opacity-0"
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Indeterminate icon */}
          <path
            className="opacity-0 group-data-indeterminate:opacity-100"
            d="M3 7H11"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </HeadlessCheckbox>
  );
}
