import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function DropdownHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={cn(className, "col-span-5 px-3.5 pt-2.5 pb-1 sm:px-3")} />
}