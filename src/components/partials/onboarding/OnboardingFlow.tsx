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

import { CheckIcon } from "@heroicons/react/24/outline";
import { Box, Container, Stepper, Step, StepLabel, StepIcon, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { WelcomeStep, CaregiverAccountsStep } from "@/components/partials/onboarding";

type OnboardingStep = "welcome" | "caregivers" | "complete";

interface OnboardingFlowProps {
  initialStep?: OnboardingStep;
  className?: string;
}

export default function OnboardingFlow({
  initialStep = "welcome",
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
      key: "welcome",
      title: t("onboarding.steps.welcome", "Welcome & Settings"),
      completed: currentStep !== "welcome",
    },
    {
      key: "caregivers",
      title: t("onboarding.steps.caregivers", "Caregiver Accounts"),
      completed: currentStep === "complete",
    },
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  const handleNextStep = () => {
    switch (currentStep) {
      case "welcome":
        setCurrentStep("caregivers");
        break;
      case "caregivers":
        setCurrentStep("complete");
        // Navigate to binders page or main app
        navigate("/binders");
        break;
      default:
        navigate("/binders");
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case "caregivers":
        setCurrentStep("welcome");
        break;
      case "welcome":
      default:
        navigate("/");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeStep onContinue={handleNextStep} />;
      case "caregivers":
        return <CaregiverAccountsStep onContinue={handleNextStep} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
      className={className}
    >
      {/* Progress Indicator */}
      <Box
        sx={{
          py: 4,
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Stepper activeStep={currentStepIndex} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.key} completed={step.completed}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <StepIcon
                      {...props}
                      icon={
                        step.completed ? (
                          <CheckIcon style={{ width: 16, height: 16 }} />
                        ) : (
                          index + 1
                        )
                      }
                    />
                  )}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      display: { xs: "none", sm: "inline" },
                      fontWeight: index <= currentStepIndex ? "medium" : "regular",
                      color: index <= currentStepIndex ? "primary.main" : "text.secondary",
                    }}
                  >
                    {step.title}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
      </Box>

      {/* Step Content */}
      <Box component="main" sx={{ flex: 1 }}>
        {renderCurrentStep()}
      </Box>

      {/* Step Navigation (optional footer) */}
      {currentStep !== "welcome" && (
        <Box
          sx={{
            py: 2,
            px: 4,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Button
              onClick={handlePreviousStep}
              variant="text"
              sx={{ color: "text.secondary" }}
            >
              ← {t("onboarding.navigation.back", "Back")}
            </Button>
          </Container>
        </Box>
      )}
    </Box>
  );
}
