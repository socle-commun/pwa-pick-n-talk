import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

export default function Navbar({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav {...props} className={cn(className, "flex flex-1 items-center gap-4 px-4 py-2.5")} />
}