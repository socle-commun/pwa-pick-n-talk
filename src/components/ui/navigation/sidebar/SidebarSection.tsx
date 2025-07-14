import { useId } from "react";

import { LayoutGroup } from "framer-motion";

import cn from "@/utils/cn";

export default function SidebarSection({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <div
        {...props}
        data-slot="section"
        className={cn(className, "flex flex-col gap-0.5")}
      />
    </LayoutGroup>
  );
}
