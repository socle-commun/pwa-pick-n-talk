import Sidebar from "@/components/ui/navigation/sidebar/Sidebar";
import SidebarBody from "@/components/ui/navigation/sidebar/SidebarBody";
import SidebarHeader from "@/components/ui/navigation/sidebar/SidebarHeader";
import SidebarItem from "@/components/ui/navigation/sidebar/SidebarItem";
import SidebarSection from "@/components/ui/navigation/sidebar/SidebarSection";

import Brand from "@/components/partials/global/Brand";

import navItems from "./navItems";

export default function NavBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          {navItems.map(({ label, url }) => (
            <SidebarItem key={label} href={url}>
              {label}
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}