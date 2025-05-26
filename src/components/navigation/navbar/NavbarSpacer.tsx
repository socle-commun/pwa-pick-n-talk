import type { ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function NavbarSpacer({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" {...props} className={cn(className, "-ml-4 flex-1")} />
}