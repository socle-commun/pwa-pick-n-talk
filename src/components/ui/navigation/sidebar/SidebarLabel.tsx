import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function SidebarLabel({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return <span {...props} className={cn(className, "truncate")} />;
}
