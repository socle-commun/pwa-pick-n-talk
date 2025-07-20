/**
 * @file src/components/partials/onboarding/WelcomeStep.tsx
 * @description Welcome step component for user onboarding setup flow.
 *
 * This component provides:
 * - Brief introduction to the application and setup phase
 * - Global settings configuration (language, theme, accessibility)
 * - Real-time settings persistence to database
 * - History logging for setup started action
 * - Tutorial preparation
 */

import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import Logo from "@/components/partials/global/Logo";

import { db } from "@/db";
import { type History, type Setting } from "@/db/models";
import cn from "@/utils/cn";

interface WelcomeStepProps {
  onContinue?: () => void;
  className?: string;
}

export default function WelcomeStep({ onContinue, className }: WelcomeStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create history entry for setup started on component mount
  const createSetupStartedHistory = useCallback(async () => {
    try {
      const setupHistory: History = {
        id: crypto.randomUUID(),
        entityType: "user",
        entityId: "system", // Using system for global setup events
        action: HistoryActionSchema.setupStarted,
        performedBy: "system", // No user context yet in onboarding
        timestamp: new Date(),
        changes: {},
      };

      await db.createHistory(setupHistory);
    } catch (error) {
      console.error("Failed to log setup started history:", error);
    }
  }, []);

  // Initialize tutorial setting on component mount
  const initializeTutorialSetting = useCallback(async () => {
    try {
      const tutorialSetting: Setting = {
        key: "tutorial",
        value: true,
      };

      await db.upsertSetting(tutorialSetting);
    } catch (error) {
      console.error("Failed to initialize tutorial setting:", error);
    }
  }, []);

  // Handle setup initialization
  useEffect(() => {
    createSetupStartedHistory();
    initializeTutorialSetting();
  }, [createSetupStartedHistory, initializeTutorialSetting]);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Default navigation to main setup flow
      navigate("/setup");
    }
  };

  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-4xl", className)}>
      {/* Header Section */}
      <div className={cn("text-center py-8")}>
        <Logo className={cn("size-20 mx-auto mb-6")} />
        <Heading level={1} className={cn("text-3xl lg:text-4xl mb-4")}>
          {t("onboarding.welcome.title", "Welcome to Pick'n'Talk!")}
        </Heading>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto")}>
          {t("onboarding.welcome.subtitle", "Let's get you set up with your personalized communication experience. First, let's configure your preferences.")}
        </p>
      </div>

      {/* Settings Configuration Section */}
      <div className={cn("bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8")}>
        <Heading level={2} className={cn("text-xl mb-6")}>
          {t("onboarding.welcome.settings.title", "Your Preferences")}
        </Heading>

        <div className={cn("grid md:grid-cols-2 gap-6")}>
          {/* Language Selection */}
          <div className={cn("space-y-4")}>
            <Heading level={3} className={cn("text-lg font-medium")}>
              {t("onboarding.welcome.settings.language.title", "Language")}
            </Heading>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.language.description", "Choose your preferred language for the interface.")}
            </p>
            <LocaleSelector />
          </div>

          {/* Theme Settings */}
          <div className={cn("space-y-4")}>
            <Heading level={3} className={cn("text-lg font-medium")}>
              {t("onboarding.welcome.settings.theme.title", "Appearance")}
            </Heading>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.theme.description", "Customize the look and feel of the application.")}
            </p>
            <div className={cn("space-y-4")}>
              <ThemeModeToggle />
              <FontSizeSelector />
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className={cn("space-y-4 md:col-span-2")}>
            <Heading level={3} className={cn("text-lg font-medium")}>
              {t("onboarding.welcome.settings.accessibility.title", "Accessibility")}
            </Heading>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.accessibility.description", "Configure accessibility features to enhance your experience.")}
            </p>
            <div className={cn("grid md:grid-cols-2 gap-4")}>
              <HighContrastModeToggle />
              <DaltonismModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className={cn("grid md:grid-cols-2 gap-6 mb-8")}>
        <div className={cn("text-center p-6 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800")}>
          <div className={cn("size-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center")}>
            <svg className={cn("size-6 text-blue-600 dark:text-blue-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <Heading level={3} className={cn("text-lg mb-2")}>
            {t("onboarding.welcome.features.customize.title", "Personalized Setup")}
          </Heading>
          <p className={cn("text-zinc-700 dark:text-zinc-300")}>
            {t("onboarding.welcome.features.customize.description", "We'll guide you through creating your first communication binder with pictures and words that matter to you.")}
          </p>
        </div>

        <div className={cn("text-center p-6 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800")}>
          <div className={cn("size-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center")}>
            <svg className={cn("size-6 text-green-600 dark:text-green-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <Heading level={3} className={cn("text-lg mb-2")}>
            {t("onboarding.welcome.features.quick.title", "Quick & Easy")}
          </Heading>
          <p className={cn("text-zinc-700 dark:text-zinc-300")}>
            {t("onboarding.welcome.features.quick.description", "Get started in just a few minutes with our intuitive setup process and helpful tutorials.")}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
        <Button onClick={handleContinue} className={cn("px-8 py-3")}>
          {t("onboarding.welcome.cta.continue", "Continue Setup")}
        </Button>
        <Button
          href="/binders"
          outline
          className={cn("px-8 py-3")}
        >
          {t("onboarding.welcome.cta.skip", "Skip for Now")}
        </Button>
      </div>
    </div>
  );
}
