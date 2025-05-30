import { UserIcon, Cog8ToothIcon, ShieldCheckIcon, LightBulbIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

import Navbar from "@/components/ui/navigation/navbar/Navbar";
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/ui/data-display/dropdown";
import NavbarDivider from "@/components/ui/navigation/navbar/NavbarDivider";
import NavbarSection from "@/components/ui/navigation/navbar/NavbarSection";
import NavbarItem from "@/components/ui/navigation/navbar/NavbarItem";
import NavbarSpacer from "@/components/ui/navigation/navbar/NavbarSpacer";
import { Avatar } from "@/components/ui/data-display/avatar";

import Brand from "@/components/partials/global/Brand";

import navItems from "./navItems";
import Link from "@/components/ui/navigation/Link";

export default function NavBar() {

  return (
    <Navbar>
      <NavbarSection>
        <Link href="/">
          <Brand />
        </Link>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection className="max-lg:hidden">
        {navItems.map(({ label, url }) => (
          <NavbarItem key={label} href={url}>
            {label}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
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
  );
}