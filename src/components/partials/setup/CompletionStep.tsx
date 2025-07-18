import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

import { userAtom } from "@/utils/state/atoms";
import { Button } from "@/components/ui/actions";
import type { OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

interface CompletionStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function CompletionStep({ data }: CompletionStepProps) {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);

  return (
    <div className={cn("text-center space-y-6")}>
      <div className={cn("space-y-4")}>
        <div className={cn("text-6xl mb-4")}>🎉</div>

        <h3 className={cn("text-2xl font-bold")}>
          {t("onboarding.completion.title", "Congratulations, {{name}}!", { name: user?.name })}
        </h3>

        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.completion.subtitle", "You're all set up and ready to start communicating!")}
        </p>
      </div>

      <div className={cn("grid md:grid-cols-2 gap-6 my-8")}>
        <div className={cn("p-6 bg-success-secondary rounded-lg border border-success-border")}>
          <div className={cn("text-success-text text-3xl mb-3")}>✅</div>
          <h4 className={cn("font-semibold mb-2")}>
            {t("onboarding.completion.setup.title", "Setup Complete")}
          </h4>
          <ul className={cn("text-sm text-zinc-600 dark:text-zinc-400 space-y-1 text-left")}>
            <li>• {t("onboarding.completion.setup.account", "Account created")}</li>
            {data.binderName && (
              <li>• {t("onboarding.completion.setup.binder", "First binder: {{name}}", { name: data.binderName })}</li>
            )}
            <li>• {t("onboarding.completion.setup.preferences", "Preferences configured")}</li>
          </ul>
        </div>

        <div className={cn("p-6 bg-info-secondary rounded-lg border border-info-border")}>
          <div className={cn("text-info-text text-3xl mb-3")}>🚀</div>
          <h4 className={cn("font-semibold mb-2")}>
            {t("onboarding.completion.next.title", "What's Next?")}
          </h4>
          <ul className={cn("text-sm text-zinc-600 dark:text-zinc-400 space-y-1 text-left")}>
            <li>• {t("onboarding.completion.next.explore", "Explore your dashboard")}</li>
            <li>• {t("onboarding.completion.next.pictograms", "Add pictograms to your binder")}</li>
            <li>• {t("onboarding.completion.next.organize", "Organize by categories")}</li>
            <li>• {t("onboarding.completion.next.practice", "Start practicing communication")}</li>
          </ul>
        </div>
      </div>

      <div className={cn("bg-sky-50 dark:bg-sky-900/20 p-6 rounded-lg")}>
        <h4 className={cn("font-semibold text-sky-800 dark:text-sky-200 mb-2")}>
          💡 {t("onboarding.completion.tip.title", "Quick Tip")}
        </h4>
        <p className={cn("text-sky-700 dark:text-sky-300 text-sm")}>
          {t("onboarding.completion.tip.content",
            "Check out the Help section in the app menu for tutorials, tips, and best practices for effective communication with pictograms."
          )}
        </p>
      </div>

      <div className={cn("pt-6")}>
        <Button href="/profile" outline className={cn("mr-4")}>
          {t("onboarding.completion.actions.profile", "View Profile")}
        </Button>

        <Button href="/binders" className={cn("px-8")}>
          {t("onboarding.completion.actions.explore", "Start Exploring")}
        </Button>
      </div>
    </div>
  );
}
