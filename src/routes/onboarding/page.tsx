import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import Logo from "@/components/partials/global/Logo";
import { userAtom } from "@/utils/state/atoms";
import OnboardingWizard from "./components/OnboardingWizard";

import cn from "@/utils/cn";

export default function OnboardingPage() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, [user, navigate]);

  // Redirect if user has already completed onboarding
  useEffect(() => {
    if (user && user.hasCompletedOnboarding) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <Logo className={cn("size-16 animate-pulse")} />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-800")}>
      <div className={cn("container mx-auto px-4 py-8 max-w-4xl")}>
        <div className={cn("text-center mb-8")}>
          <Logo className={cn("size-16 mx-auto mb-4")} />
          <h1 className={cn("text-3xl font-bold tracking-tight")}>
            {t("onboarding.welcome.title", "Welcome to Pick & Talk!")}
          </h1>
          <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 mt-2")}>
            {t("onboarding.welcome.subtitle", "Let's set up your first communication binder")}
          </p>
        </div>

        <OnboardingWizard />
      </div>
    </div>
  );
}