import { useState } from "react";

import { Outlet } from "react-router";

import Cog6ToothIcon from "@heroicons/react/20/solid/Cog6ToothIcon";

import ResponsiveTopBar from "@/components/navigation/ResponsiveTopBar";
import TopBarNavLink from "@/components/navigation/TopBarNavLink";

import Brand from "@/components/global/Brand";

import cn from "@/utilities/cn";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <ResponsiveTopBar
        isOpen={isOpen}
        onToggle={toggleOpen}
        brand={<Brand />}>
        <TopBarNavLink href="/settings" onClick={toggleOpen} className={cn("text-zinc-500 hover:text-inherit transition-colors")}>
          <Cog6ToothIcon className={cn("size-5 fill-current")} />
          <span className={cn("font-bold")}>Settings</span>
        </TopBarNavLink>
      </ResponsiveTopBar>

      <Outlet />
    </>
  )
}