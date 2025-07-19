import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";

interface SetupProgressProps {
  currentStepIndex: number;
  totalSteps: number;
  stepTitle: string;
  progressPercentage?: number;
}

export default function SetupProgress({
  currentStepIndex,
  totalSteps,
  stepTitle,
  progressPercentage: customProgressPercentage,
}: SetupProgressProps) {
  const { t } = useTranslation();
  const progressPercentage = Math.min(100, Math.max(0, customProgressPercentage ?? ((currentStepIndex + 1) / totalSteps) * 100));

  return (
    <div className={cn("mb-8")}>
      <div className={cn("flex items-center justify-between text-sm text-secondary mb-2")}>
        <span>
          {t("onboarding.progress.step", "Step")} {currentStepIndex + 1} {t("onboarding.progress.of", "of")} {totalSteps}
        </span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <div className={cn("w-full bg-tertiary rounded-full h-2 border border-primary")}>
        <div
          className={cn("bg-info-primary h-2 rounded-full transition-all duration-300")}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <h2 className={cn("text-2xl font-bold mt-4 mb-4")}>{stepTitle}</h2>
    </div>
  );
}
