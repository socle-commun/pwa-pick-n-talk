import { type FieldProps as HeadlessFieldProps, Field as HeadlessField } from "@headlessui/react";

import cn from "@/utilities/cn";

export default function SwitchField({
  className,
  ...props
}: { className?: string } & Omit<HeadlessFieldProps, "as" | "className">) {
  return (
    <HeadlessField
      data-slot="field"
      {...props}
      className={cn(
        className,
        // Base layout
        "grid grid-cols-[1fr_auto] gap-x-8 gap-y-1 sm:grid-cols-[1fr_auto]",
        // Control layout
        "*:data-[slot=control]:col-start-2 *:data-[slot=control]:self-start sm:*:data-[slot=control]:mt-0.5",
        // Label layout
        "*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1",
        // Description layout
        "*:data-[slot=description]:col-start-1 *:data-[slot=description]:row-start-2",
        // With description
        "has-data-[slot=description]:**:data-[slot=label]:font-medium",
      )}
    />
  );
}
