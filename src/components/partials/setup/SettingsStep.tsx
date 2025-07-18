import { useTranslation } from "react-i18next";

import { Form } from "@/components/ui/forms";
import { Switch } from "@/components/ui/data-input/switch";
import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import { SettingsStepSchema, type SettingsStepData, type OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

interface SettingsStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function SettingsStep({ data, onUpdate, onNext }: SettingsStepProps) {
  const { t } = useTranslation();

  const handleSubmit = async (formData: SettingsStepData) => {
    onUpdate(formData);
    onNext();
  };

  const handleToggle = (field: keyof SettingsStepData) => (checked: boolean) => {
    onUpdate({ [field]: checked });
  };

  return (
    <div className={cn("space-y-6")}>
      <div className={cn("text-center mb-8")}>
        <div className={cn("text-4xl mb-4")}>♿</div>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.settings.intro", 
            "First, let's configure your accessibility preferences and personalize your Pick & Talk experience."
          )}
        </p>
      </div>

      <Form<SettingsStepData>
        schema={SettingsStepSchema}
        initialValues={{
          enableNotifications: data.enableNotifications ?? true,
          preferredLanguage: data.preferredLanguage || "en",
          enableSounds: data.enableSounds ?? true,
        }}
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        <div className={cn("space-y-6")}>
          {/* Accessibility Section */}
          <div className={cn("border border-zinc-200 dark:border-zinc-700 rounded-lg p-6")}>
            <h3 className={cn("text-lg font-semibold mb-4 flex items-center gap-2")}>
              ♿ {t("onboarding.settings.accessibility.title", "Accessibility Options")}
            </h3>
            <div className={cn("space-y-4")}>
              {/* Font Size */}
              <div className={cn("space-y-2")}>
                <FontSizeSelector />
                <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                  {t("onboarding.settings.fontSize.description", "Adjust text size for better readability")}
                </p>
              </div>

              {/* Theme Mode */}
              <div className={cn("space-y-2")}>
                <ThemeModeToggle />
                <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                  {t("onboarding.settings.theme.description", "Choose light or dark theme for better visibility")}
                </p>
              </div>

              {/* High Contrast Mode */}
              <div className={cn("space-y-2")}>
                <HighContrastModeToggle />
                <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                  {t("onboarding.settings.highContrast.description", "Enable high contrast mode for better visual accessibility")}
                </p>
              </div>

              {/* Daltonism Support */}
              <div className={cn("space-y-2")}>
                <DaltonismModeToggle />
                <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                  {t("onboarding.settings.daltonism.description", "Adjust colors for color vision accessibility")}
                </p>
              </div>
            </div>
          </div>

          {/* Language Selection */}
          <div className={cn("space-y-3")}>
            <label className={cn("block text-sm font-medium")}>
              {t("onboarding.settings.language.label", "Preferred Language")}
            </label>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.settings.language.description", "Choose your preferred language for the interface")}
            </p>
            <LocaleSelector />
          </div>

          {/* Notifications Toggle */}
          <div className={cn("flex items-start justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg")}>
            <div className={cn("space-y-1")}>
              <label className={cn("text-sm font-medium")}>
                {t("onboarding.settings.notifications.label", "Enable Notifications")}
              </label>
              <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                {t("onboarding.settings.notifications.description", "Get notified about app updates and helpful tips")}
              </p>
            </div>
            <Switch
              checked={data.enableNotifications ?? true}
              onChange={handleToggle("enableNotifications")}
              aria-label={t("onboarding.settings.notifications.label", "Enable Notifications")}
            />
          </div>

          {/* Sounds Toggle */}
          <div className={cn("flex items-start justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg")}>
            <div className={cn("space-y-1")}>
              <label className={cn("text-sm font-medium")}>
                {t("onboarding.settings.sounds.label", "Enable Sounds")}
              </label>
              <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
                {t("onboarding.settings.sounds.description", "Play audio feedback when interacting with pictograms")}
              </p>
            </div>
            <Switch
              checked={data.enableSounds ?? true}
              onChange={handleToggle("enableSounds")}
              aria-label={t("onboarding.settings.sounds.label", "Enable Sounds")}
            />
          </div>
        </div>

        <div className={cn("info-secondary p-4 rounded-lg")}>
          <h3 className={cn("font-semibold info-text mb-2")}>
            ℹ️ {t("onboarding.settings.note.title", "Note")}
          </h3>
          <p className={cn("info-text text-sm")}>
            {t("onboarding.settings.note.content", 
              "These settings help ensure Pick & Talk works best for your needs. You can change any of these settings later in the app preferences."
            )}
          </p>
        </div>

        <div className={cn("text-center pt-4")}>
          <button
            type="submit"
            className={cn(
              "px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            )}
          >
            {t("onboarding.settings.continue", "Continue to Welcome")}
          </button>
        </div>
      </Form>
    </div>
  );
}