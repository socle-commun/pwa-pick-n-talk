import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utilities/cn";

export default function DescriptionList({ className, ...props }: ComponentPropsWithoutRef<'dl'>) {
  return (
    <dl
      {...props}
      className={cn(
        className,
        'grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,--spacing(80))_auto] sm:text-sm/6'
      )}
    />
  );
}