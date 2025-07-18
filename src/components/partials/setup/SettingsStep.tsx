import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/actions";
import { type SettingsStepData, type OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

import AccessibilitySettings from "./components/AccessibilitySettings";
import PreferencesSettings from "./components/PreferencesSettings";

interface SettingsStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function SettingsStep({ data, onUpdate, onNext }: SettingsStepProps) {
  const { t } = useTranslation();

  const handleSubmit = async () => {
    onNext();
  };

  const handleToggle = (field: keyof SettingsStepData) => (checked: boolean) => {
    onUpdate({ [field]: checked });
  };

  return (
    <div className={cn("space-y-8")}>
      <div className={cn("text-center mb-8")}>
        <div className={cn("text-4xl mb-4")}>♿</div>
        <p className={cn("text-lg text-secondary")}>
          {t("onboarding.settings.intro",
            "First, let's configure your accessibility preferences and personalize your Pick & Talk experience."
          )}
        </p>
      </div>

      {/* Accessibility Settings */}
      <AccessibilitySettings />

      {/* Preferences Settings */}
      <PreferencesSettings data={data} onToggle={handleToggle} />

      {/* Continue Button */}
      <div className={cn("flex justify-end pt-4")}>
        <Button
          onClick={handleSubmit}
          color="sky"
          className={cn("px-6 py-2")}
        >
          {t("onboarding.settings.continue", "Continue")}
        </Button>
      </div>
    </div>
  );
}
