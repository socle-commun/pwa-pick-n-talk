import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/actions";
import { userAtom } from "@/utils/state/atoms";
import { db } from "@/db";

import WelcomeStep from "./WelcomeStep";
import BinderCreationStep from "./BinderCreationStep";
import SettingsStep from "./SettingsStep";
import CompletionStep from "./CompletionStep";

import type { OnboardingFormData } from "../schemas/onboarding";
import cn from "@/utils/cn";

const STEPS = [
  { id: "settings", title: "Accessibility & Preferences", component: SettingsStep },
  { id: "welcome", title: "Welcome", component: WelcomeStep },
  { id: "binder", title: "Create Your First Binder", component: BinderCreationStep },
  { id: "completion", title: "All Set!", component: CompletionStep },
];

export default function OnboardingWizard() {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    enableNotifications: true,
    preferredLanguage: "en",
    enableSounds: true,
    welcomeAcknowledged: false,
    binderName: "",
    binderDescription: "",
    binderCategories: [],
    binderPictograms: [],
    completed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

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
    // Skip onboarding and go directly to home with minimal setup
    if (user) {
      const updatedUser = { ...user, hasCompletedOnboarding: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Update user in database
      db.updateUser({ ...user, hasCompletedOnboarding: true });
    }
    navigate("/");
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Create the binder if provided
      if (formData.binderName) {
        const binderId = crypto.randomUUID();
        
        // Create categories first if any were added
        const categoryIds: string[] = [];
        if (formData.binderCategories && formData.binderCategories.length > 0) {
          for (const categoryData of formData.binderCategories) {
            const categoryId = crypto.randomUUID();
            await db.createCategory({
              id: categoryId,
              properties: {
                name: { en: categoryData.name },
              },
              pictograms: [],
            });
            categoryIds.push(categoryId);
          }
        }

        // Create pictograms if any were selected
        const pictogramIds: string[] = [];
        if (formData.binderPictograms && formData.binderPictograms.length > 0) {
          // In a real implementation, you would fetch the actual pictogram data
          // For now, we'll create placeholder pictograms based on the selection
          for (let i = 0; i < formData.binderPictograms.length; i++) {
            const pictogramId = formData.binderPictograms[i];
            const newPictogramId = crypto.randomUUID();
            await db.createPictogram({
              id: newPictogramId,
              binder: binderId,
              isFavorite: false,
              order: i, // Add required order field
              properties: {
                name: { en: pictogramId }, // Simplified for demo
              },
              categories: categoryIds, // Associate with created categories
            });
            pictogramIds.push(newPictogramId);
          }
        }

        await db.createBinder({
          id: binderId,
          author: user.id,
          properties: {
            name: { en: formData.binderName },
            description: { en: formData.binderDescription || "" },
          },
          pictograms: pictogramIds,
          users: [user.id],
          isFavorite: false,
        });

        // Update user with the new binder
        const updatedBinders = [...user.binders, binderId];
        await db.updateUser({ 
          ...user,
          binders: updatedBinders,
          hasCompletedOnboarding: true,
        });

        // Update local state
        const updatedUser = { 
          ...user, 
          binders: updatedBinders,
          hasCompletedOnboarding: true 
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        // Just mark onboarding as complete
        await db.updateUser({ ...user, hasCompletedOnboarding: true });
        const updatedUser = { ...user, hasCompletedOnboarding: true };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (stepData: Partial<OnboardingFormData>) => {
    setFormData({ ...formData, ...stepData });
  };

  const CurrentStepComponent = currentStep.component;

  return (
    <div className={cn("bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-8")}>
      {/* Progress indicator */}
      <div className={cn("mb-8")}>
        <div className={cn("flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400 mb-2")}>
          <span>{t("onboarding.progress.step", "Step")} {currentStepIndex + 1} {t("onboarding.progress.of", "of")} {STEPS.length}</span>
          <span>{Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className={cn("w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2")}>
          <div
            className={cn("bg-sky-600 h-2 rounded-full transition-all duration-300")}
            style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className={cn("min-h-[400px] mb-8")}>
        <h2 className={cn("text-2xl font-bold mb-4")}>{currentStep.title}</h2>
        <CurrentStepComponent
          data={formData}
          onUpdate={updateFormData}
          onNext={handleNext}
          isLastStep={isLastStep}
        />
      </div>

      {/* Navigation */}
      <div className={cn("flex items-center justify-between")}>
        <div className={cn("flex gap-2")}>
          {!isFirstStep && (
            <Button outline onClick={handlePrevious}>
              {t("onboarding.navigation.previous", "Previous")}
            </Button>
          )}
          <Button plain onClick={handleSkip} className={cn("text-zinc-500")}>
            {t("onboarding.navigation.skip", "Skip Tutorial")}
          </Button>
        </div>

        <div>
          {isLastStep ? (
            <Button 
              onClick={handleComplete} 
              disabled={isSubmitting}
              className={cn("px-8")}
            >
              {isSubmitting 
                ? t("onboarding.navigation.completing", "Completing...")
                : t("onboarding.navigation.complete", "Complete Setup")
              }
            </Button>
          ) : (
            <Button onClick={handleNext} className={cn("px-8")}>
              {t("onboarding.navigation.next", "Next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}