import { Outlet, useLocation, useNavigate } from "react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { StackedLayout } from "@/components/ui/layout";
import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";

import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";

export default function Layout() {
  const [user] = useAtom(userAtom);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to setup if database is empty (first-time setup)
  useEffect(() => {
    const checkSetupStatus = async () => {
      try {
        if (user &&
            await db.isEmpty() &&
            !location.pathname.startsWith("/setup") &&
            !location.pathname.startsWith("/auth/")) {
          navigate("/setup");
        }
      } catch (error) {
        console.error("Failed to check setup status:", error);
      }
    };

    checkSetupStatus();
  }, [user, location.pathname, navigate]);

  return (
    <>
      <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
        <Outlet />
      </StackedLayout>
    </>
  );
}
