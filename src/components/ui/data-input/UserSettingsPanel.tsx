/**
 * @file src/components/ui/data-input/UserSettingsPanel.tsx
 * @description Personal settings panel for user preferences configuration.
 *
 * This component provides:
 * - Language selection
 * - Accessibility preferences (daltonism, high contrast, font size)
 * - Theme mode selection
 * - Real-time updates with callbacks
 */

import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import { Heading } from "@/components/ui/typography";

import cn from "@/utils/cn";

interface UserSettingsPanelProps {
  className?: string;
}

export default function UserSettingsPanel({
  className,
}: UserSettingsPanelProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <Heading level={3} className="text-lg font-medium mb-4">
          {t("settings.personal.title", "Personal Preferences")}
        </Heading>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {t("settings.personal.subtitle", "Customize your experience with personalized settings.")}
        </p>
      </div>

      {/* Language Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.language.title", "Language")}
        </Heading>
        <LocaleSelector className="max-w-xs" />
      </div>

      {/* Appearance Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.appearance.title", "Appearance")}
        </Heading>
        <div className="grid sm:grid-cols-2 gap-4">
          <ThemeModeToggle />
          <FontSizeSelector />
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.accessibility.title", "Accessibility")}
        </Heading>
        <div className="grid sm:grid-cols-2 gap-4">
          <DaltonismModeToggle />
          <HighContrastModeToggle />
        </div>
      </div>
    </div>
  );
}