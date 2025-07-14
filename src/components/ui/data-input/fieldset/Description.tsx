import {
  type DescriptionProps as HeadlessDescriptionProps,
  Description as HeadlessDescription,
} from "@headlessui/react";

import cn from "@/utilities/cn";

export default function Description({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDescriptionProps, "as" | "className">) {
  return (
    <HeadlessDescription
      data-slot="description"
      {...props}
      className={cn(className, "text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400")}
    />
  );
}
