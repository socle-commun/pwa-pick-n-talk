import { useId, type ComponentPropsWithoutRef } from "react";

import { LayoutGroup } from "framer-motion";

import cn from "@/utils/cn";

export default function NavbarSection({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={cn(className, "flex items-center gap-3")} />
    </LayoutGroup>
  );
}
