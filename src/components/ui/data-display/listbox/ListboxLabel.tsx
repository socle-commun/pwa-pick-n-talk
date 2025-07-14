import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function ListboxLabel({
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...props}
      className={cn(
        className,
        "ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0"
      )}
    />
  );
}
