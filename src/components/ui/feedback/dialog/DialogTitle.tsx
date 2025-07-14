import {
  type DialogTitleProps as HeadlessDialogTitleProps,
  DialogTitle as HeadlessDialogTitle
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function DialogTitle({
  className,
  ...props
}: { className?: string } & Omit<HeadlessDialogTitleProps, "as" | "className">) {
  return (
    <HeadlessDialogTitle
      {...props}
      className={cn(className, "text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white")}
    />
  )
}