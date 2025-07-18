import { useTranslation } from "react-i18next";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import cn from "@/utils/cn";

export default function AccessibilitySettings() {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-6")}>
      <h3 className={cn("text-lg font-semibold")}>
        {t("onboarding.settings.accessibility.title", "Accessibility & Visual Settings")}
      </h3>

      <div className={cn("grid md:grid-cols-2 gap-6")}>
        {/* Theme Mode */}
        <div className={cn("space-y-2")}>
          <label className={cn("text-sm font-medium")}>
            {t("onboarding.settings.theme.title", "Theme")}
          </label>
          <ThemeModeToggle />
        </div>

        {/* High Contrast Mode */}
        <div className={cn("space-y-2")}>
          <label className={cn("text-sm font-medium")}>
            {t("onboarding.settings.contrast.title", "High Contrast")}
          </label>
          <HighContrastModeToggle />
        </div>

        {/* Font Size */}
        <div className={cn("space-y-2")}>
          <label className={cn("text-sm font-medium")}>
            {t("onboarding.settings.fontSize.title", "Font Size")}
          </label>
          <FontSizeSelector />
        </div>

        {/* Daltonism Support */}
        <div className={cn("space-y-2")}>
          <label className={cn("text-sm font-medium")}>
            {t("onboarding.settings.daltonism.title", "Color Vision Support")}
          </label>
          <DaltonismModeToggle />
        </div>
      </div>

      <div className={cn("bg-info-secondary border border-info-border rounded-lg p-4")}>
        <div className={cn("flex items-start gap-3")}>
          <span className={cn("text-lg")}>💡</span>
          <div>
            <h4 className={cn("font-semibold text-info-text mb-1")}>
              {t("onboarding.settings.tip.title", "Accessibility First")}
            </h4>
            <p className={cn("text-sm text-info-text")}>
              {t("onboarding.settings.tip.description", "These settings help make Pick & Talk more accessible. You can change them anytime in the settings menu.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
