// import { useState } from "react";

import { Outlet } from "react-router";

import Brand from "@/components/global/Brand";
import Navbar from "@/components/navigation/navbar/Navbar";
import NavbarSection from "@/components/navigation/navbar/NavbarSection";
import NavbarItem from "@/components/navigation/navbar/NavbarItem";
import Link from "@/components/navigation/Link";

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
        <NavbarSection>
          <NavbarItem href="/" current>
            Home
          </NavbarItem>
          <NavbarItem href="/events">Events</NavbarItem>
          <NavbarItem href="/orders">Orders</NavbarItem>
        </NavbarSection>
      </Navbar>

      <Outlet />
    </>
  )
}