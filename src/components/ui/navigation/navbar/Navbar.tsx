import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function Navbar({
  className,
  ...props
}: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      {...props}
      className={cn(className, "flex flex-1 items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2.5 min-w-0")}
    />
  );
}
