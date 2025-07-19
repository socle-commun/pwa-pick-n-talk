/**
 * @file WelcomeStep.tsx
 * @description First step of the onboarding flow - introduces the app and allows global settings configuration
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Logo from "@/components/partials/global/Logo";
import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";

import { db } from "@/db";
import { type History, type Setting } from "@/db/models";
import cn from "@/utils/cn";

interface WelcomeStepProps {
  className?: string;
}

export default function WelcomeStep({ className }: WelcomeStepProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [setupId] = useState(() => crypto.randomUUID());

  // Log setup started on component mount
  useEffect(() => {
    const logSetupStarted = async () => {
      try {
        const historyEntry: History = {
          id: crypto.randomUUID(),
          entityType: "user",
          entityId: "setup",
          action: "setupStarted",
          performedBy: "system",
          timestamp: new Date(),
          changes: {
            setup: {
              step: "welcome",
              startedAt: new Date().toISOString(),
            },
          },
        };
        await db.createHistory(historyEntry);
      } catch (error) {
        console.error("Failed to log setup started:", error);
      }
    };

    logSetupStarted();
  }, []);

  // Save setting in real-time
  const saveSetting = useCallback(async (key: string, value: unknown) => {
    try {
      const setting: Setting = { 
        key, 
        value: value as string | number | boolean | Record<string, never>
      };
      await db.upsertSetting(setting);
    } catch (error) {
      console.error(`Failed to save setting ${key}:`, error);
    }
  }, []);

  // Handle tutorial setting initialization
  useEffect(() => {
    const initializeTutorial = async () => {
      try {
        await saveSetting("tutorial", true);
      } catch (error) {
        console.error("Failed to initialize tutorial setting:", error);
      }
    };

    initializeTutorial();
  }, [saveSetting]);

  // Save language changes in real-time
  useEffect(() => {
    const handleLanguageChange = () => {
      saveSetting("language", i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, saveSetting]);

  const handleStartSetup = async () => {
    setIsLoading(true);
    try {
      // Log the completion of welcome step
      const historyEntry: History = {
        id: crypto.randomUUID(),
        entityType: "user",
        entityId: setupId,
        action: "update",
        performedBy: "user",
        timestamp: new Date(),
        changes: {
          setup: {
            step: "welcome_completed",
            completedAt: new Date().toISOString(),
          },
        },
      };
      await db.createHistory(historyEntry);

      // Navigate to the next step of setup (for now, go to binders)
      navigate("/binders");
    } catch (error) {
      console.error("Failed to complete welcome step:", error);
    } finally {
      setIsLoading(false);
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
          {t(
            "onboarding.welcome.subtitle",
            "Let's get you set up with your personalized communication experience. We'll configure some global settings to make the app work perfectly for you."
          )}
        </p>
      </div>

      {/* Settings Configuration Section */}
      <div className={cn("bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 mb-8")}>
        <Heading level={2} className={cn("text-xl mb-6")}>
          {t("onboarding.welcome.settings.title", "Global Settings")}
        </Heading>

        <div className={cn("grid gap-6 md:grid-cols-2")}>
          {/* Language Selection */}
          <div className={cn("space-y-2")}>
            <LocaleSelector className="w-full" />
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.language_help", "Choose your preferred language for the interface")}
            </p>
          </div>

          {/* Theme Mode */}
          <div className={cn("space-y-2")}>
            <ThemeModeToggle className="w-full" />
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.theme_help", "Select light or dark mode based on your preference")}
            </p>
          </div>

          {/* Font Size */}
          <div className={cn("space-y-2")}>
            <FontSizeSelector className="w-full" />
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.font_size_help", "Adjust text size for better readability")}
            </p>
          </div>

          {/* High Contrast */}
          <div className={cn("space-y-2")}>
            <HighContrastModeToggle className="w-full" />
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.contrast_help", "Enable high contrast for better visibility")}
            </p>
          </div>

          {/* Daltonism Support - Full width */}
          <div className={cn("md:col-span-2 space-y-2")}>
            <DaltonismModeToggle className="w-full" />
            <p className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
              {t("onboarding.welcome.settings.daltonism_help", "Adjust colors for different types of color vision")}
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className={cn("bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8")}>
        <div className={cn("flex items-start gap-4")}>
          <div className={cn("size-8 flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-1")}>
            <svg className={cn("size-4 text-blue-600 dark:text-blue-400")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <Heading level={3} className={cn("text-lg text-blue-900 dark:text-blue-100 mb-2")}>
              {t("onboarding.welcome.info.title", "About the Setup Process")}
            </Heading>
            <p className={cn("text-blue-800 dark:text-blue-200 leading-relaxed")}>
              {t(
                "onboarding.welcome.info.description",
                "The setup process will guide you through creating your first communication binder, adding pictograms, and customizing your communication experience. All settings are saved automatically and can be changed anytime from the settings page."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={cn("flex flex-col sm:flex-row gap-4 justify-center")}>
        <Button
          onClick={handleStartSetup}
          disabled={isLoading}
          className={cn("px-8 py-3 text-lg")}
        >
          {isLoading
            ? t("onboarding.welcome.action.starting", "Starting Setup...")
            : t("onboarding.welcome.action.start", "Start Setup Process")}
        </Button>

        <Button
          href="/settings"
          outline
          className={cn("px-8 py-3 text-lg")}
        >
          {t("onboarding.welcome.action.skip", "Skip for Now")}
        </Button>
      </div>
    </div>
  );
}
