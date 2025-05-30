// import { useState } from "react";

import { Outlet } from "react-router";

import StackedLayout from "@/components/ui/layout/StackedLayout";

import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";

export default function Layout() {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
      <Outlet />
    </StackedLayout>
  )
}