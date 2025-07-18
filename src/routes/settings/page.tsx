import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import cn from "@/utils/cn";
import SettingsSection from "@/components/partials/layout/SettingsSection";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <main className="space-y-8">
      <h1 className={cn("text-2xl font-bold text-primary")}>{t("Settings", "Settings")}</h1>
      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <SettingsSection title={t("settings.language.title", "Language")}> 
          <div className="max-w-md">
            <LocaleSelector />
          </div>
        </SettingsSection>
        <SettingsSection title={t("settings.accessibility.title", "Accessibility")}> 
          <div className="max-w-md space-y-4">
            <FontSizeSelector />
            <ThemeModeToggle />
            <HighContrastModeToggle />
            <DaltonismModeToggle />
          </div>
        </SettingsSection>
      </div>
    </main>
  );
}
