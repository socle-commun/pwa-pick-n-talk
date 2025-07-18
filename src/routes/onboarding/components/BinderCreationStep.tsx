import { useTranslation } from "react-i18next";
import { useState } from "react";

import { Form, FormInput } from "@/components/ui/forms";
import { BinderStepSchema, type BinderStepData, type OnboardingFormData } from "../schemas/onboarding";
import cn from "@/utils/cn";

interface BinderCreationStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function BinderCreationStep({ data, onUpdate, onNext }: BinderCreationStepProps) {
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (formData: BinderStepData) => {
    onUpdate(formData);
    onNext();
  };

  const handleFormChange = (formData: Partial<BinderStepData>) => {
    // Validate current form data
    const validation = BinderStepSchema.safeParse({
      binderName: formData.binderName || data.binderName,
      binderDescription: formData.binderDescription || data.binderDescription,
    });
    
    setIsValid(validation.success);
    onUpdate(formData);
  };

  return (
    <div className={cn("space-y-6")}>
      <div className={cn("text-center mb-8")}>
        <div className={cn("text-4xl mb-4")}>📁</div>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.binder.intro", 
            "Let's create your first communication binder! A binder is a collection of pictograms organized for specific communication needs."
          )}
        </p>
      </div>

      <Form<BinderStepData>
        schema={BinderStepSchema}
        initialValues={{
          binderName: data.binderName || "",
          binderDescription: data.binderDescription || "",
        }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className={cn("space-y-4")}>
          <FormInput
            name="binderName"
            label={t("onboarding.binder.name.label", "Binder Name")}
            placeholder={t("onboarding.binder.name.placeholder", "e.g., My Daily Words, Meal Time, Emotions...")}
            required
            autoComplete="off"
            onChange={(e) => handleFormChange({ binderName: e.target.value })}
          />

          <FormInput
            name="binderDescription"
            label={t("onboarding.binder.description.label", "Description (optional)")}
            placeholder={t("onboarding.binder.description.placeholder", "Brief description of this binder's purpose...")}
            autoComplete="off"
            onChange={(e) => handleFormChange({ binderDescription: e.target.value })}
          />
        </div>

        <div className={cn("bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg")}>
          <h3 className={cn("font-semibold text-blue-800 dark:text-blue-200 mb-2")}>
            💡 {t("onboarding.binder.tip.title", "Pro Tip")}
          </h3>
          <p className={cn("text-blue-700 dark:text-blue-300 text-sm")}>
            {t("onboarding.binder.tip.content", 
              "You can create multiple binders for different situations (home, school, work). Start with something familiar like daily activities or basic needs."
            )}
          </p>
        </div>

        <div className={cn("grid md:grid-cols-2 gap-4")}>
          <div className={cn("p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg")}>
            <h4 className={cn("font-semibold mb-2")}>
              {t("onboarding.binder.examples.title", "Example Binders")}
            </h4>
            <ul className={cn("text-sm text-zinc-600 dark:text-zinc-400 space-y-1")}>
              <li>• {t("onboarding.binder.examples.daily", "Daily Activities")}</li>
              <li>• {t("onboarding.binder.examples.emotions", "Feelings & Emotions")}</li>
              <li>• {t("onboarding.binder.examples.food", "Food & Drinks")}</li>
              <li>• {t("onboarding.binder.examples.social", "Social Interactions")}</li>
            </ul>
          </div>

          <div className={cn("p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg")}>
            <h4 className={cn("font-semibold mb-2")}>
              {t("onboarding.binder.next_steps.title", "After Creation")}
            </h4>
            <ul className={cn("text-sm text-zinc-600 dark:text-zinc-400 space-y-1")}>
              <li>• {t("onboarding.binder.next_steps.add", "Add pictograms")}</li>
              <li>• {t("onboarding.binder.next_steps.organize", "Organize by categories")}</li>
              <li>• {t("onboarding.binder.next_steps.share", "Share with others")}</li>
              <li>• {t("onboarding.binder.next_steps.backup", "Backup your work")}</li>
            </ul>
          </div>
        </div>

        <div className={cn("text-center pt-4")}>
          <button
            type="submit"
            disabled={!isValid}
            className={cn(
              "px-8 py-3 rounded-lg transition-colors",
              isValid
                ? "bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                : "bg-zinc-300 dark:bg-zinc-600 text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
            )}
          >
            {t("onboarding.binder.create", "Create My First Binder")}
          </button>
        </div>
      </Form>
    </div>
  );
}