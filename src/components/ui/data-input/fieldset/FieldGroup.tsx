import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function FieldGroup({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="control"
      {...props}
      className={cn(className, "space-y-4")}
    />
  );
}
