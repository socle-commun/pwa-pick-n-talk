import { useState } from "react";
import { useNavigate } from "react-router";
import cn from "@/utils/cn";

import WelcomeStep from "./WelcomeStep";
import BinderCreationStep from "./BinderCreationStep";
import SettingsStep from "./SettingsStep";
import CompletionStep from "./CompletionStep";
import CaregiverCreationStep from "./CaregiverCreationStep";
import UserCreationStep from "./UserCreationStep";
import SetupProgress from "./components/SetupProgress";
import SetupNavigation from "./components/SetupNavigation";
import { useSetupCompletion } from "./hooks/useSetupCompletion";

import type { OnboardingFormData } from "@/db/models/schemas/setup";

const STEPS = [
  { id: "settings", title: "Accessibility & Preferences", component: SettingsStep, countsTowardProgress: true },
  { id: "welcome", title: "Welcome", component: WelcomeStep, countsTowardProgress: false },
  { id: "caregiver", title: "Create Caregiver Account", component: CaregiverCreationStep, countsTowardProgress: true },
  { id: "users", title: "Create User Accounts", component: UserCreationStep, countsTowardProgress: true },
  { id: "binder", title: "Create Your First Binder", component: BinderCreationStep, countsTowardProgress: true },
  { id: "completion", title: "All Set!", component: CompletionStep, countsTowardProgress: true },
];

export default function SetupWizard() {
  const navigate = useNavigate();
  const { completeSetup } = useSetupCompletion();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    enableNotifications: true,
    preferredLanguage: "en",
    enableSounds: true,
    welcomeAcknowledged: false,
    caregiver: undefined,
    users: [],
    binderName: "",
    binderDescription: "",
    binderCategories: [],
    binderPictograms: [],
    binderAssignedUsers: [],
    completed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Calculate progress excluding non-counting steps
  const progressSteps = STEPS.filter(step => step.countsTowardProgress);
  const currentProgressStepIndex = progressSteps.findIndex(step => step.id === currentStep.id);
  const progressPercentage = currentProgressStepIndex >= 0
    ? Math.round(((currentProgressStepIndex + 1) / progressSteps.length) * 100)
    : 0;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await completeSetup(formData);
      navigate("/");
    } catch (error) {
      console.error("Error completing setup:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = currentStep.component;

  return (
    <div className={cn("bg-secondary rounded-lg shadow-lg p-8")}>
      {/* Progress indicator */}
      <SetupProgress
        currentStepIndex={currentProgressStepIndex >= 0 ? currentProgressStepIndex : 0}
        totalSteps={progressSteps.length}
        stepTitle={currentStep.title}
        progressPercentage={progressPercentage}
      />

      {/* Step content */}
      <div className={cn("min-h-[400px] mb-8")}>
        <CurrentStepComponent
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          isLastStep={isLastStep}
        />
      </div>

      {/* Navigation */}
      <SetupNavigation
        currentStepIndex={currentStepIndex}
        totalSteps={STEPS.length}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        isSubmitting={isSubmitting}
        onPrevious={handlePrevious}
        onSkip={handleSkip}
        onComplete={handleComplete}
      />
    </div>
  );
}
