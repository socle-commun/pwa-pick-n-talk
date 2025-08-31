
import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Logo from "@/components/partials/global/Logo";
import { Typography } from "@mui/material";
import { useBinders } from "@/hooks/useBinders";
import { useIsEmptyDatabase } from "@/hooks/useIsEmptyDatabase";
import { userAtom } from "@/utils/state/atoms";


export default function IndexPage() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const binders = useBinders();
  const isEmptyDatabase = useIsEmptyDatabase();

  // Redirect to setup if user is authenticated and database is empty
  useEffect(() => {
    if (user && isEmptyDatabase === true) {
      navigate("/setup");
    }
  }, [user, isEmptyDatabase, navigate]);

  // Show loading state while checking user, binders, and database state
  if (!user && (binders === undefined || isEmptyDatabase === undefined)) {
    return (
      <div className={"flex items-center justify-center h-full p-4"}>
        <Logo className={"size-16 animate-pulse"} />
      </div>
    );
  }

  // Authenticated user experience
  if (user) {
    const hasNoBinders = !binders || binders.length === 0;

    return (
      <div className={"container mx-auto px-4 py-8 max-w-6xl"}>
        <div className={"text-center mb-8"}>
          <Logo className={"size-16 mx-auto mb-4"} />
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            {t("homepage.authenticated.welcome", { name: user.name })}
          </Typography>
        </div>

        {hasNoBinders ? (
          // Empty state for first-time users
          <div className={"text-center py-12"}>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {t("homepage.empty_state.title")}
            </Typography>
            <p className={"text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto"}>
              {t("homepage.empty_state.subtitle")}
            </p>
            <Button href="/binders/create" sx={{ px: 4, py: 1.5 }} variant="contained">
              {t("homepage.empty_state.cta")}
            </Button>
          </div>
        ) : (
          // Dashboard for existing users
          <div className={"space-y-8"}>
            <div className={"text-center"}>
              <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
                {t("homepage.authenticated.quick_actions")}
              </Typography>
              <div className={"flex flex-wrap justify-center gap-4"}>
                <Button href="/binders" variant="contained">
                  {t("homepage.authenticated.recent_binders")}
                </Button>
                <Button href="/binders/create" variant="outlined">
                  {t("homepage.empty_state.cta")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Non-authenticated user experience
  return (
    <div className={"container mx-auto px-4 py-8 max-w-6xl"}>
      {/* Hero Section */}
      <section className={"text-center py-12 mb-16"}>
        <Logo className={"size-24 mx-auto mb-8"} />
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          {t("homepage.hero.title")}
        </Typography>
        <p className={"text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto"}>
          {t("homepage.hero.subtitle")}
        </p>
        <div className={"flex flex-col sm:flex-row gap-4 justify-center"}>
          <Button href="/auth/sign-up" sx={{ px: 4, py: 1.5 }} variant="contained">
            {t("homepage.hero.cta.primary")}
          </Button>
          <Button href="#features" sx={{ px: 4, py: 1.5 }} variant="outlined">
            {t("homepage.hero.cta.secondary")}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={"py-16"}>
        <div className={"text-center mb-12"}>
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            {t("homepage.features.title")}
          </Typography>
        </div>
        <div className={"grid md:grid-cols-3 gap-8"}>
          {/* Customizable Feature */}
          <div className={"text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900"}>
            <div className={"size-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"}>
              <svg className={"size-6 text-blue-600 dark:text-blue-400"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {t("homepage.features.items.customizable.title")}
            </Typography>
            <p className={"text-zinc-600 dark:text-zinc-400"}>
              {t("homepage.features.items.customizable.description")}
            </p>
          </div>

          {/* Accessible Feature */}
          <div className={"text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900"}>
            <div className={"size-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"}>
              <svg className={"size-6 text-green-600 dark:text-green-400"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {t("homepage.features.items.accessible.title")}
            </Typography>
            <p className={"text-zinc-600 dark:text-zinc-400"}>
              {t("homepage.features.items.accessible.description")}
            </p>
          </div>

          {/* Offline Feature */}
          <div className={"text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900"}>
            <div className={"size-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"}>
              <svg className={"size-6 text-purple-600 dark:text-purple-400"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {t("homepage.features.items.offline.title")}
            </Typography>
            <p className={"text-zinc-600 dark:text-zinc-400"}>
              {t("homepage.features.items.offline.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={"text-center py-16"}>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          {t("homepage.cta.title")}
        </Typography>
        <p className={"text-lg text-zinc-600 dark:text-zinc-400 mb-8"}>
          {t("homepage.cta.description")}
        </p>
        <Button href="/auth/sign-up" sx={{ px: 4, py: 1.5 }} variant="contained">
          {t("homepage.hero.cta.primary")}
        </Button>
      </section>
    </div>
  );
}
