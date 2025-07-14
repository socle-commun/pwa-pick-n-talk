import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function SidebarBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        className,
        "flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8"
      )}
    />
  );
}
