import {
  type DialogTitleProps as HeadlessDialogTitleProps,
  DialogTitle as HeadlessDialogTitle,
} from "@headlessui/react";

import cn from "@/utilities/cn";


export default function AlertTitle({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDialogTitleProps, "as" | "className">) {
  return (
    <HeadlessDialogTitle
      {...props}
      className={cn(
        className,
        "text-center text-base/6 font-semibold text-balance text-zinc-950 sm:text-left sm:text-sm/6 sm:text-wrap dark:text-white"
      )}
    />
  )
}