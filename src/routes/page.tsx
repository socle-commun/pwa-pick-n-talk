
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

import Logo from "@/components/partials/global/Logo";
import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import { useBinders } from "@/hooks/useBinders";
import { useIsEmptyDatabase } from "@/hooks/useIsEmptyDatabase";
import { userAtom } from "@/utils/state/atoms";

import cn from "@/utils/cn";

export default function IndexPage() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const binders = useBinders();
  const isEmptyDatabase = useIsEmptyDatabase();

  // Show loading state while checking user, binders, and database state
  if (!user && (binders === undefined || isEmptyDatabase === undefined)) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <Logo className={cn("size-16 animate-pulse")} />
      </div>
    );
  }

  // Authenticated user experience
  if (user) {
    const hasNoBinders = !binders || binders.length === 0;

    return (
      <div className={cn("container mx-auto px-4 py-8 max-w-6xl")}>
        <div className={cn("text-center mb-8")}>
          <Logo className={cn("size-16 mx-auto mb-4")} />
          <Heading level={1} className={cn("text-3xl mb-2")}>
            {t("homepage.authenticated.welcome", { name: user.name })}
          </Heading>
        </div>

        {hasNoBinders ? (
          // Empty state for first-time users
          <div className={cn("text-center py-12")}>
            <Heading level={2} className={cn("text-2xl mb-4")}>
              {t("homepage.empty_state.title")}
            </Heading>
            <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto")}>
              {t("homepage.empty_state.subtitle")}
            </p>
            <Button href="/binders/create" className={cn("px-8 py-3")}>
              {t("homepage.empty_state.cta")}
            </Button>
          </div>
        ) : (
          // Dashboard for existing users
          <div className={cn("space-y-8")}>
            <div className={cn("text-center")}>
              <Heading level={2} className={cn("text-2xl mb-4")}>
                {t("homepage.authenticated.quick_actions")}
              </Heading>
              <div className={cn("flex flex-wrap justify-center gap-4")}>
                <Button href="/binders">
                  {t("homepage.authenticated.recent_binders")}
                </Button>
                <Button href="/binders/create" outline>
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
    <div className={cn("container mx-auto px-4 py-8 max-w-6xl")}>
      {/* Hero Section */}
      <section className={cn("text-center py-12 mb-16")}>
        <Logo className={cn("size-24 mx-auto mb-8")} />
        <Heading level={1} className={cn("text-4xl lg:text-5xl mb-6")}>
          {t("homepage.hero.title")}
        </Heading>
        <p className={cn("text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-3xl mx-auto")}>
          {t("homepage.hero.subtitle")}
        </p>
        <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
          <Button href="/auth/sign-up" className={cn("px-8 py-3")}>
            {t("homepage.hero.cta.primary")}
          </Button>
          <Button href="#features" outline className={cn("px-8 py-3")}>
            {t("homepage.hero.cta.secondary")}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={cn("py-16")}>
        <div className={cn("text-center mb-12")}>
          <Heading level={2} className={cn("text-3xl mb-4")}>
            {t("homepage.features.title")}
          </Heading>
        </div>
        <div className={cn("grid md:grid-cols-3 gap-8")}>
          {/* Customizable Feature */}
          <div className={cn("text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900")}>
            <div className={cn("size-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center")}>
              <svg className={cn("size-6 text-blue-600 dark:text-blue-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <Heading level={3} className={cn("text-xl mb-2")}>
              {t("homepage.features.items.customizable.title")}
            </Heading>
            <p className={cn("text-zinc-600 dark:text-zinc-400")}>
              {t("homepage.features.items.customizable.description")}
            </p>
          </div>

          {/* Accessible Feature */}
          <div className={cn("text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900")}>
            <div className={cn("size-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center")}>
              <svg className={cn("size-6 text-green-600 dark:text-green-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <Heading level={3} className={cn("text-xl mb-2")}>
              {t("homepage.features.items.accessible.title")}
            </Heading>
            <p className={cn("text-zinc-600 dark:text-zinc-400")}>
              {t("homepage.features.items.accessible.description")}
            </p>
          </div>

          {/* Offline Feature */}
          <div className={cn("text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900")}>
            <div className={cn("size-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center")}>
              <svg className={cn("size-6 text-purple-600 dark:text-purple-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <Heading level={3} className={cn("text-xl mb-2")}>
              {t("homepage.features.items.offline.title")}
            </Heading>
            <p className={cn("text-zinc-600 dark:text-zinc-400")}>
              {t("homepage.features.items.offline.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={cn("text-center py-16")}>
        <Heading level={2} className={cn("text-3xl mb-4")}>
          {t("homepage.cta.title")}
        </Heading>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 mb-8")}>
          {t("homepage.cta.description")}
        </p>
        <Button href="/auth/sign-up" className={cn("px-8 py-3")}>
          {t("homepage.hero.cta.primary")}
        </Button>
      </section>
    </div>
  );
}
