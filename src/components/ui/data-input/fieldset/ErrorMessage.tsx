import {
  type DescriptionProps as HeadlessDescriptionProps,
  Description as HeadlessDescription
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function ErrorMessage({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDescriptionProps, "as" | "className">) {
  return (
    <HeadlessDescription
      data-slot="error"
      {...props}
      className={cn(className, "text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500")}
    />
  )
}
