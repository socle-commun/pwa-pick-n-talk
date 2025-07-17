import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import cn from "@/utils/cn";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h1 className={cn("text-2xl font-bold text-primary")}>
        {t("Settings", "Settings")}
      </h1>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">
              {t("settings.language.title", "Language")}
            </h2>
            <div className="max-w-md">
              <LocaleSelector />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-primary mb-4">
              {t("settings.accessibility.title", "Accessibility")}
            </h2>
            <div className="max-w-md space-y-4">
              <ThemeModeToggle />
              <DaltonismModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
