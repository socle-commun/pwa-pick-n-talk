import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/actions";
import cn from "@/utils/cn";

interface SetupNavigationProps {
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export default function SetupNavigation({
  currentStepIndex,
  totalSteps,
  isFirstStep,
  isLastStep,
  isSubmitting,
  onPrevious,
  onSkip,
  onComplete,
}: SetupNavigationProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("flex items-center justify-between")}>
      <div className={cn("flex gap-2")}>
        {!isFirstStep && (
          <Button
            color="zinc"
            onClick={onPrevious}
            className={cn("px-4 py-2")}
          >
            {t("onboarding.navigation.previous", "Previous")}
          </Button>
        )}
        <Button
          plain
          onClick={onSkip}
          className={cn("px-4 py-2 text-secondary hover:text-primary")}
        >
          {t("onboarding.navigation.skip", "Skip Tutorial")}
        </Button>
      </div>

      <div className={cn("flex items-center gap-4")}>
        <span className={cn("text-sm text-secondary")}>
          {t("onboarding.navigation.step", "Step")} {currentStepIndex + 1} / {totalSteps}
        </span>
        {isLastStep && (
          <Button
            color="sky"
            onClick={onComplete}
            disabled={isSubmitting}
            className={cn("px-6 py-2")}
          >
            {isSubmitting
              ? t("onboarding.navigation.completing", "Completing...")
              : t("onboarding.navigation.complete", "Complete Setup")
            }
          </Button>
        )}
      </div>
    </div>
  );
}
