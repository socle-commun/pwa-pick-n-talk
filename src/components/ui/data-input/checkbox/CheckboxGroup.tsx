import type { ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function CheckboxGroup({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={cn(
        className,
        // Basic groups
        "space-y-3",
        // With descriptions
        "has-data-[slot=description]:space-y-6 has-data-[slot=description]:**:data-[slot=label]:font-medium"
      )}
    />
  )
}