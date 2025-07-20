/**
 * @file src/components/partials/onboarding/OnboardingFlow.tsx
 * @description Multi-step onboarding flow component.
 *
 * This component provides:
 * - Step-by-step onboarding process
 * - Navigation between steps
 * - Progress tracking
 * - State management for the entire flow
 */

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { WelcomeStep, CaregiverAccountsStep } from "@/components/partials/onboarding";
import cn from "@/utils/cn";

type OnboardingStep = 'welcome' | 'caregivers' | 'complete';

interface OnboardingFlowProps {
  initialStep?: OnboardingStep;
  className?: string;
}

export default function OnboardingFlow({ 
  initialStep = 'welcome',
  className 
}: OnboardingFlowProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep);

  const steps: Array<{
    key: OnboardingStep;
    title: string;
    completed?: boolean;
  }> = [
    {
      key: 'welcome',
      title: t('onboarding.steps.welcome', 'Welcome & Settings'),
      completed: currentStep !== 'welcome',
    },
    {
      key: 'caregivers',
      title: t('onboarding.steps.caregivers', 'Caregiver Accounts'),
      completed: currentStep === 'complete',
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  const handleNextStep = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('caregivers');
        break;
      case 'caregivers':
        setCurrentStep('complete');
        // Navigate to binders page or main app
        navigate('/binders');
        break;
      default:
        navigate('/binders');
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'caregivers':
        setCurrentStep('welcome');
        break;
      case 'welcome':
      default:
        navigate('/');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep onContinue={handleNextStep} />;
      case 'caregivers':
        return <CaregiverAccountsStep onContinue={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("min-h-screen bg-zinc-50 dark:bg-zinc-900", className)}>
      {/* Progress Indicator */}
      <div className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div className={cn(
                  "flex items-center justify-center size-8 rounded-full text-sm font-medium",
                  index <= currentStepIndex
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-200 dark:bg-zinc-600 text-zinc-600 dark:text-zinc-400"
                )}>
                  {step.completed ? (
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={cn(
                  "ml-2 text-sm font-medium hidden sm:inline",
                  index <= currentStepIndex
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-zinc-600 dark:text-zinc-400"
                )}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "hidden sm:block mx-4 h-px w-12",
                    index < currentStepIndex
                      ? "bg-blue-600"
                      : "bg-zinc-200 dark:bg-zinc-600"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <main className="flex-1">
        {renderCurrentStep()}
      </main>

      {/* Step Navigation (optional footer) */}
      {currentStep !== 'welcome' && (
        <div className="bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 p-4">
          <div className="container mx-auto max-w-2xl">
            <button
              onClick={handlePreviousStep}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              ← {t('onboarding.navigation.back', 'Back')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}