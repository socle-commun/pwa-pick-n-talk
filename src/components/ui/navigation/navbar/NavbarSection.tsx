import { LayoutGroup } from "framer-motion";
import { useId, type ComponentPropsWithoutRef } from "react";


import cn from "@/utils/cn";

export default function NavbarSection({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div {...props} className={cn(className, "flex items-center gap-1 sm:gap-3 min-w-0")} />
    </LayoutGroup>
  );
}
