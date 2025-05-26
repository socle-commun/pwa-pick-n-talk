// import { useState } from "react";

import { Outlet } from "react-router";

import { UserIcon, Cog8ToothIcon, ShieldCheckIcon, LightBulbIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

import Brand from "@/components/global/Brand";
import Dropdown from "@/components/data-display/dropdown/Dropdown";
import Avatar from "@/components/data-display/avatar/Avatar";
import DropdownButton from "@/components/data-display/dropdown/DropdownButton";
import DropdownDivider from "@/components/data-display/dropdown/DropdownDivider";
import DropdownItem from "@/components/data-display/dropdown/DropdownItem";
import DropdownLabel from "@/components/data-display/dropdown/DropdownLabel";
import DropdownMenu from "@/components/data-display/dropdown/DropdownMenu";
import Link from "@/components/navigation/Link";
import Navbar from "@/components/navigation/navbar/Navbar";
import NavbarItem from "@/components/navigation/navbar/NavbarItem";
import NavbarSection from "@/components/navigation/navbar/NavbarSection";
import NavbarSpacer from "@/components/navigation/navbar/NavbarSpacer";

import cn from "@/utilities/cn";

export default function Layout() {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar>
        <Link href="/" aria-label="Home">
          <Brand />
        </Link>
        <NavbarSpacer />
        <NavbarSection>
          <Dropdown>
            <DropdownButton as={NavbarItem} aria-label="Account menu">
              <Avatar initials="MM" />
            </DropdownButton>
            <DropdownMenu className="min-w-64" anchor="bottom end">
              <DropdownItem href="/my-profile">
                <UserIcon />
                <DropdownLabel>My profile</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/settings">
                <Cog8ToothIcon />
                <DropdownLabel>Settings</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/privacy-policy">
                <ShieldCheckIcon />
                <DropdownLabel>Privacy policy</DropdownLabel>
              </DropdownItem>
              <DropdownItem href="/share-feedback">
                <LightBulbIcon />
                <DropdownLabel>Share feedback</DropdownLabel>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem href="/logout">
                <ArrowRightStartOnRectangleIcon />
                <DropdownLabel>Sign out</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarSection>
      </Navbar>

      <Outlet />
    </>
  )
}