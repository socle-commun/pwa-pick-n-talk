import { useTranslation } from "react-i18next";

import { Form } from "@/components/ui/forms";
import { Switch } from "@/components/ui/data-input/switch";
import LocaleSelector from "@/components/ui/LocaleSelector";
import { SettingsStepSchema, type SettingsStepData, type OnboardingFormData } from "../schemas/onboarding";
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
        <div className={cn("text-4xl mb-4")}>⚙️</div>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.settings.intro", 
            "Let's configure your preferences to personalize your Pick & Talk experience."
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

        <div className={cn("bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg")}>
          <h3 className={cn("font-semibold text-amber-800 dark:text-amber-200 mb-2")}>
            ℹ️ {t("onboarding.settings.note.title", "Note")}
          </h3>
          <p className={cn("text-amber-700 dark:text-amber-300 text-sm")}>
            {t("onboarding.settings.note.content", 
              "You can change these settings anytime in the app's preferences. These are just your starting preferences."
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
            {t("onboarding.settings.save", "Save Preferences")}
          </button>
        </div>
      </Form>
    </div>
  );
}