import { type FieldProps as HeadlessFieldProps, Field as HeadlessField } from "@headlessui/react";

import cn from "@/utilities/cn";

export default function Field({
  className,
  ...props
}: { className?: string } & Omit<HeadlessFieldProps, "as" | "className">) {
  return (
    <HeadlessField
      {...props}
      className={cn(
        className,
        "[&>[data-slot=label]+[data-slot=control]]:mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:mt-3",
        "*:data-[slot=label]:font-medium",
      )}
    />
  );
}
