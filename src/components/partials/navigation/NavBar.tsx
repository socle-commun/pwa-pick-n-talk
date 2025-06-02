import { UserIcon, Cog8ToothIcon, ShieldCheckIcon, LightBulbIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

import { Avatar, Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/ui/data-display";
import { Navbar, NavbarDivider, NavbarSection, NavbarItem, NavbarSpacer, Link } from "@/components/ui/navigation";

import Brand from "@/components/partials/global/Brand";

import navItems from "./navItems";

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