import { useState } from "react";
import cn from "@/utils/cn";

import type { OnboardingFormData, UserAccountData } from "@/db/models/schemas/setup";
import CaregiverStepHeader from "./components/CaregiverStepHeader";
import CaregiverStepTips from "./components/CaregiverStepTips";
import PasswordField from "./components/PasswordField";
import FormField from "./components/FormField";

interface CaregiverCreationStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function CaregiverCreationStep({
  data,
  onUpdate,
  onNext,
}: CaregiverCreationStepProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const caregiver = data.caregiver || {
    name: "",
    email: "",
    password: "",
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!caregiver.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!caregiver.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(caregiver.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (caregiver.password && caregiver.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (caregiver.password && caregiver.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const updateCaregiverField = (field: keyof UserAccountData, value: string) => {
    const updatedCaregiver = { ...caregiver, [field]: value };
    onUpdate({ caregiver: updatedCaregiver });
  };

  return (
    <div className={cn("space-y-6")}>
      <CaregiverStepHeader />

      {errors.general && (
        <div className={cn("bg-destructive/10 border border-destructive rounded-lg p-4")}>
          <p className={cn("text-sm text-destructive")}>{errors.general}</p>
        </div>
      )}

      <div className={cn("space-y-4")}>
        <FormField
          label="Full Name"
          value={caregiver.name || ""}
          onChange={(value) => updateCaregiverField("name", value)}
          error={errors.name}
          placeholder="Enter caregiver's full name"
          required
        />

        <FormField
          label="Email Address"
          type="email"
          value={caregiver.email || ""}
          onChange={(value) => updateCaregiverField("email", value)}
          error={errors.email}
          placeholder="caregiver@example.com"
          required
        />

        <PasswordField
          label="Password (Optional)"
          value={caregiver.password || ""}
          onChange={(value) => updateCaregiverField("password", value)}
          error={errors.password}
          placeholder="Leave empty for no password"
          showConfirmPassword={true}
          confirmValue={confirmPassword}
          onConfirmChange={setConfirmPassword}
          confirmError={errors.confirmPassword}
        />
      </div>

      <CaregiverStepTips />

      <div className={cn("flex justify-end")}>
        <button
          onClick={handleNext}
          className={cn(
            "px-6 py-2 bg-info-primary text-white rounded-md",
            "hover:bg-info-primary/90 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-info-primary focus:ring-offset-2"
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
