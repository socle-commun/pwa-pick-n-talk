import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/data-input/switch";
import LocaleSelector from "@/components/ui/LocaleSelector";
import type { SettingsStepData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

interface PreferencesSettingsProps {
  data: Partial<SettingsStepData>;
  onToggle: (field: keyof SettingsStepData) => (checked: boolean) => void;
}

export default function PreferencesSettings({ data, onToggle }: PreferencesSettingsProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-6")}>
      <h3 className={cn("text-lg font-semibold")}>
        {t("onboarding.settings.preferences.title", "General Preferences")}
      </h3>

      <div className={cn("space-y-4")}>
        {/* Language Selection */}
        <div className={cn("space-y-2")}>
          <label className={cn("text-sm font-medium")}>
            {t("onboarding.settings.language.title", "Language")}
          </label>
          <LocaleSelector />
          <p className={cn("text-xs text-secondary")}>
            {t("onboarding.settings.language.description", "Choose your preferred language for the interface.")}
          </p>
        </div>

        {/* Notifications */}
        <div className={cn("flex items-center justify-between p-4 border border-primary rounded-lg")}>
          <div className={cn("flex-1")}>
            <h4 className={cn("font-medium")}>
              {t("onboarding.settings.notifications.title", "Enable Notifications")}
            </h4>
            <p className={cn("text-sm text-secondary")}>
              {t("onboarding.settings.notifications.description", "Get notified about important updates and reminders.")}
            </p>
          </div>
          <Switch
            checked={data.enableNotifications ?? true}
            onChange={onToggle("enableNotifications")}
          />
        </div>

        {/* Sounds */}
        <div className={cn("flex items-center justify-between p-4 border border-primary rounded-lg")}>
          <div className={cn("flex-1")}>
            <h4 className={cn("font-medium")}>
              {t("onboarding.settings.sounds.title", "Enable Sounds")}
            </h4>
            <p className={cn("text-sm text-secondary")}>
              {t("onboarding.settings.sounds.description", "Play sound effects and audio feedback when interacting with pictograms.")}
            </p>
          </div>
          <Switch
            checked={data.enableSounds ?? true}
            onChange={onToggle("enableSounds")}
          />
        </div>
      </div>
    </div>
  );
}
