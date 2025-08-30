import Brand from "@/components/partials/global/Brand";
import Sidebar from "@/components/ui/navigation/sidebar/Sidebar";
import SidebarBody from "@/components/ui/navigation/sidebar/SidebarBody";
import SidebarHeader from "@/components/ui/navigation/sidebar/SidebarHeader";
import SidebarSection from "@/components/ui/navigation/sidebar/SidebarSection";


export default function NavBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection></SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
}
