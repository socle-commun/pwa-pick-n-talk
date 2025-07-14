import {
  type DescriptionProps as HeadlessDescriptionProps,
  Description as HeadlessDescription,
} from "@headlessui/react";

import Text from "@/components/ui/typography/text/Text";

import cn from "@/utils/cn";

export default function AlertDescription({
  className,
  ...props
}: { className?: string } & Omit<
  HeadlessDescriptionProps<typeof Text>,
  "as" | "className"
>) {
  return (
    <HeadlessDescription
      as={Text}
      {...props}
      className={cn(className, "mt-2 text-center text-pretty sm:text-left")}
    />
  );
}
