import { useState } from "react";

import { Outlet } from "react-router";

import Cog8ToothIcon from "@heroicons/react/20/solid/Cog8ToothIcon";

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
        onClick={toggleOpen}
        brand={<Brand />}>
        <TopBarNavLink to="/settings" onClick={toggleOpen} className={cn("text-black fill-black dark:text-white dark:fill-white hover:text-blue-600 hover:fill-blue-600 dark:hover:text-blue-400 dark:hover:fill-blue-400")}>
          <Cog8ToothIcon className={cn("size-4")} />
          <span>Settings</span>
        </TopBarNavLink>
      </ResponsiveTopBar>

      <Outlet />
    </>
  )
}