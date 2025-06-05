import { useAtom } from "jotai";

import { Cog8ToothIcon, ShieldCheckIcon, LightBulbIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";

import { Button } from "@/components/ui/actions";
import { Avatar, Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/ui/data-display";
import { NavbarItem } from "@/components/ui/navigation";

import useUserActions from "@/state/actions/useUserActions";
import { userAtom } from "@/state/atoms";

import cn from "@/utilities/cn";
import { getInitials } from "@/utilities/text";

export default function AuthManager() {
  const userActions = useUserActions();
  const [user] = useAtom(userAtom);

  return user ? (
    <Dropdown>
      <DropdownButton as={NavbarItem}>
        <Avatar initials={getInitials(user.name ? user.name : "")} />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor="bottom end">
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
        <DropdownItem onClick={() => {
          userActions.logout();
        }}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>Sign out</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <div className={cn("flex items-center gap-2 max-lg:hidden")}>
      <Button href="/auth/sign-up">Sign Up</Button>
      <Button href="/auth/sign-in" outline>Sign In</Button>
    </div>
  )
}
