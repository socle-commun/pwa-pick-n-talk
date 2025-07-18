import { useTranslation } from "react-i18next";
import { FormInput } from "@/components/ui/forms";
import cn from "@/utils/cn";

export default function BinderBasicInfo() {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-4")}>
      <FormInput
        name="binderName"
        label={t("onboarding.binder.name.label", "Binder Name")}
        placeholder={t("onboarding.binder.name.placeholder", "e.g., My Daily Words, Meal Time, Emotions...")}
        required
      />

      <FormInput
        name="binderDescription"
        label={t("onboarding.binder.description.label", "Description (optional)")}
        placeholder={t("onboarding.binder.description.placeholder", "Brief description of this binder's purpose...")}
      />
    </div>
  );
}
