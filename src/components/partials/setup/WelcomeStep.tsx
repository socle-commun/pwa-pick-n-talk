import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

import { userAtom } from "@/utils/state/atoms";
import type { OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

interface WelcomeStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function WelcomeStep({ onUpdate, onNext }: WelcomeStepProps) {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);

  const handleContinue = () => {
    onUpdate({ welcomeAcknowledged: true });
    onNext();
  };

  return (
    <div className={cn("text-center space-y-6")}>
      <div className={cn("space-y-4")}>
        <p className={cn("text-lg")}>
          {t("onboarding.welcome.greeting", "Hello {{name}}! 👋", { name: user?.name })}
        </p>
        
        <p className={cn("text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.welcome.intro", 
            "Pick & Talk is a powerful communication app that helps you create personalized pictogram boards for enhanced communication."
          )}
        </p>

        <div className={cn("grid md:grid-cols-3 gap-4 my-8")}>
          <div className={cn("p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg")}>
            <div className={cn("text-sky-600 dark:text-sky-400 text-2xl mb-2")}>📱</div>
            <h3 className={cn("font-semibold mb-1")}>
              {t("onboarding.welcome.features.easy.title", "Easy to Use")}
            </h3>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.features.easy.description", "Intuitive interface designed for all users")}
            </p>
          </div>

          <div className={cn("p-4 bg-green-50 dark:bg-green-900/20 rounded-lg")}>
            <div className={cn("text-green-600 dark:text-green-400 text-2xl mb-2")}>🎨</div>
            <h3 className={cn("font-semibold mb-1")}>
              {t("onboarding.welcome.features.customizable.title", "Customizable")}
            </h3>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.features.customizable.description", "Create personalized communication boards")}
            </p>
          </div>

          <div className={cn("p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg")}>
            <div className={cn("text-purple-600 dark:text-purple-400 text-2xl mb-2")}>📴</div>
            <h3 className={cn("font-semibold mb-1")}>
              {t("onboarding.welcome.features.offline.title", "Works Offline")}
            </h3>
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-400")}>
              {t("onboarding.welcome.features.offline.description", "Access your binders anywhere, anytime")}
            </p>
          </div>
        </div>

        <p className={cn("text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.welcome.guide", 
            "This quick tutorial will help you create your first communication binder and configure your preferences."
          )}
        </p>
      </div>

      <div className={cn("pt-4")}>
        <button
          onClick={handleContinue}
          className={cn(
            "px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          )}
        >
          {t("onboarding.welcome.start", "Let's Get Started!")}
        </button>
      </div>
    </div>
  );
}