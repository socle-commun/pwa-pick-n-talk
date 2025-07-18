import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";
import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import cn from "@/utils/cn";

export default function SetupPage() {
  const { t } = useTranslation();

  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-4xl")}>
      <div className={cn("text-center py-12")}>
        <Logo className={cn("size-16 mx-auto mb-8")} />
        <Heading level={1} className={cn("text-3xl lg:text-4xl mb-6")}>
          {t("setup.title", "Welcome to Pick'n'Talk")}
        </Heading>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto")}>
          {t("setup.subtitle", "Let's set up your first communication binder to get started.")}
        </p>
        <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
          <Button href="/binders/create" className={cn("px-8 py-3")}>
            {t("setup.cta.primary", "Create Your First Binder")}
          </Button>
          <Button href="/binders" outline className={cn("px-8 py-3")}>
            {t("setup.cta.secondary", "Browse Templates")}
          </Button>
        </div>
      </div>
      
      <div className={cn("grid md:grid-cols-2 gap-8 mt-16")}>
        <div className={cn("text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900")}>
          <div className={cn("size-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center")}>
            <svg className={cn("size-6 text-blue-600 dark:text-blue-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <Heading level={3} className={cn("text-xl mb-2")}>
            {t("setup.features.customize.title", "Customize Your Binder")}
          </Heading>
          <p className={cn("text-zinc-600 dark:text-zinc-400")}>
            {t("setup.features.customize.description", "Add your own pictures, words, and organize them exactly how you need.")}
          </p>
        </div>

        <div className={cn("text-center p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900")}>
          <div className={cn("size-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center")}>
            <svg className={cn("size-6 text-green-600 dark:text-green-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <Heading level={3} className={cn("text-xl mb-2")}>
            {t("setup.features.quick.title", "Quick & Easy")}
          </Heading>
          <p className={cn("text-zinc-600 dark:text-zinc-400")}>
            {t("setup.features.quick.description", "Get started in minutes with our intuitive interface and helpful guides.")}
          </p>
        </div>
      </div>
    </div>
  );
}