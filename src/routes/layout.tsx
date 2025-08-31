import { Outlet } from "react-router";


import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";
import StackedLayout from "@/components/partials/layout/StackedLayout";

export default function Layout() {
  return (
    <>
      <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
        <Outlet />
      </StackedLayout>
    </>
  );
}
