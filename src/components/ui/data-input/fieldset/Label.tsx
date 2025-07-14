import {
  type LabelProps as HeadlessLabelProps,
  Label as HeadlessLabel,
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function Label({
  className,
  ...props
}: { className?: string } & Omit<HeadlessLabelProps, "as" | "className">) {
  return (
    <HeadlessLabel
      data-slot="label"
      {...props}
      className={cn(
        className,
        "text-base/6 select-none data-disabled:opacity-50 sm:text-sm/6"
      )}
    />
  );
}
