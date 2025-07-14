import {
  type MenuSectionProps as HeadlessMenuSectionProps,
  MenuSection as HeadlessMenuSection,
} from "@headlessui/react";

import cn from "@/utils/cn";

export default function DropdownSection({
  className,
  ...props
}: { className?: string } & Omit<
  HeadlessMenuSectionProps,
  "as" | "className"
>) {
  return (
    <HeadlessMenuSection
      {...props}
      className={cn(
        className,
        // Define grid at the section level instead of the item level if subgrid is supported
        "col-span-full supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
      )}
    />
  );
}
