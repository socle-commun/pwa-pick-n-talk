import { Outlet } from "react-router";

import { AuthLayout } from "@/components/ui/layout";

export default function Layout() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}