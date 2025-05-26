import {
  type LabelProps as HeadlessLabelProps,
  Label as HeadlessLabel
} from "@headlessui/react";

import cn from "@/utilities/cn";

export default function DropdownLabel({
  className,
  ...props
}: { className?: string } & Omit<HeadlessLabelProps, "as" | "className">) {
  return (
    <HeadlessLabel {...props} data-slot="label" className={cn(className, "col-start-2 row-start-1")} />
  )
}