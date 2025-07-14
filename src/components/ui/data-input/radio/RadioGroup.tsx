import {
  type RadioGroupProps as HeadlessRadioGroupProps,
  RadioGroup as HeadlessRadioGroup,
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function RadioGroup({
  className,
  ...props
}: { className?: string } & Omit<HeadlessRadioGroupProps, "as" | "className">) {
  return (
    <HeadlessRadioGroup
      data-slot="control"
      {...props}
      className={cn(
        className,
        // Basic groups
        "space-y-3 **:data-[slot=label]:font-normal",
        // With descriptions
        "has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium"
      )}
    />
  )
}