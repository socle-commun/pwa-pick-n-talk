
import { Outlet } from "react-router";

import { StackedLayout } from "@/components/ui/layout";

import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";

export default function Layout() {
  return (
    <>
      <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
        <Outlet />
      </StackedLayout>
    </>
  )
}