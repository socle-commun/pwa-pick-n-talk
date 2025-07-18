import { Outlet, useLocation, useNavigate } from "react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { StackedLayout } from "@/components/ui/layout";
import { userAtom } from "@/utils/state/atoms";

import NavBar from "@/components/partials/navigation/NavBar";
import SideBar from "@/components/partials/navigation/SideBar";

export default function Layout() {
  const [user] = useAtom(userAtom);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to onboarding if user is authenticated but hasn't completed onboarding
  useEffect(() => {
    if (user && 
        !user.hasCompletedOnboarding && 
        !location.pathname.startsWith('/onboarding') &&
        !location.pathname.startsWith('/auth/')) {
      navigate('/onboarding');
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <StackedLayout navbar={<NavBar />} sidebar={<SideBar />}>
        <Outlet />
      </StackedLayout>
    </>
  );
}
