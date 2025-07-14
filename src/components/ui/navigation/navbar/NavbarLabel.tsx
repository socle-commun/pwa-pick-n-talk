import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function NavbarLabel({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={cn(className, "truncate")} />
}
