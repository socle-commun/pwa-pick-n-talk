import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function Sidebar({
  className,
  ...props
}: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props} className={cn(className, "flex h-full min-h-0 flex-col")} />
  );
}
