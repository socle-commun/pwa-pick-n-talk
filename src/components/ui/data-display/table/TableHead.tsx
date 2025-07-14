import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function TableHead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead {...props} className={cn(className, "text-zinc-500 dark:text-zinc-400")} />
}