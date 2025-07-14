import {
  type FieldsetProps as HeadlessFieldsetProps,
  Fieldset as HeadlessFieldset
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function Fieldset({
  className,
  ...props
}: { className?: string } & Omit<HeadlessFieldsetProps, "as" | "className">) {
  return (
    <HeadlessFieldset
      {...props}
      className={cn(className, "*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6")}
    />
  )
}