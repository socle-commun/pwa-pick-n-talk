import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function SidebarSpacer({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div aria-hidden="true" {...props} className={cn(className, "mt-8 flex-1")} />;
}
