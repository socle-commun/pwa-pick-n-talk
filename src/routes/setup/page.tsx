import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { useEffect } from "react";


import Logo from "@/components/partials/global/Logo";
import { userAtom } from "@/utils/state/atoms";
import SetupWizard from "@/components/partials/setup/SetupWizard";
import { Heading } from "@/components/ui/typography/heading";
import { Text } from "@/components/ui/typography/text";
import AuthLayout from "@/components/ui/layout/AuthLayout";
import { OnboardingCard } from "@/components/partials/layout";
import cn from "@/utils/cn";

/**
 * SetupPage – Displays the onboarding wizard for first-time users.
 * Uses only UI components for layout and typography.
 */
export default function SetupPage() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  // Redirect if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/auth/sign-in");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <AuthLayout>
        <Logo className={cn("size-16 animate-pulse")} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <OnboardingCard>
        <Logo className={cn("size-16 mb-4")} />
        <Heading level={1} className={cn("text-3xl font-bold tracking-tight text-center")}> 
          {t("setup.welcome.title", "Welcome to Pick & Talk!")}
        </Heading>
        <Text className={cn("text-lg text-zinc-600 dark:text-zinc-400 mt-2 text-center mb-8")}> 
          {t("setup.welcome.subtitle", "Let's set up your first communication binder")}
        </Text>
        <SetupWizard />
      </OnboardingCard>
    </AuthLayout>
  );
}
