import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import cn from "@/utils/cn";

import type { OnboardingFormData, UserAccountData } from "@/db/models/schemas/setup";
import UserStepHeader from "./components/UserStepHeader";
import UserStepTips from "./components/UserStepTips";
import UserForm from "./components/UserForm";

interface UserCreationStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function UserCreationStep({
  data,
  onUpdate,
  onNext,
}: UserCreationStepProps) {
  const [confirmPasswords, setConfirmPasswords] = useState<Record<number, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const users = data.users || [];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    users.forEach((user, index) => {
      if (!user.name?.trim()) {
        newErrors[`user-${index}-name`] = `User ${index + 1} name is required`;
      }

      if (!user.email?.trim()) {
        newErrors[`user-${index}-email`] = `User ${index + 1} email is required`;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        newErrors[`user-${index}-email`] = `User ${index + 1} email is invalid`;
      }

      if (user.password && user.password.length < 6) {
        newErrors[`user-${index}-password`] = `User ${index + 1} password must be at least 6 characters`;
      }

      if (user.password && user.password !== confirmPasswords[index]) {
        newErrors[`user-${index}-confirmPassword`] = `User ${index + 1} passwords do not match`;
      }

      // Check for duplicate emails
      const duplicateIndex = users.findIndex((u, i) => i !== index && u.email === user.email);
      if (duplicateIndex !== -1) {
        newErrors[`user-${index}-email`] = `Email already used by User ${duplicateIndex + 1}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (users.length === 0) {
      setErrors({ general: "Please add at least one user account" });
      return;
    }
    if (validateForm()) {
      onNext();
    }
  };

  const addUser = () => {
    const newUsers = [...users, { name: "", email: "", password: "" }];
    onUpdate({ users: newUsers });
  };

  const removeUser = (index: number) => {
    const newUsers = users.filter((_, i) => i !== index);
    onUpdate({ users: newUsers });

    // Clean up state for removed user
    const newConfirmPasswords = { ...confirmPasswords };
    delete newConfirmPasswords[index];
    setConfirmPasswords(newConfirmPasswords);
  };

  const updateUserField = (index: number, field: keyof UserAccountData, value: string) => {
    const newUsers = [...users];
    newUsers[index] = { ...newUsers[index], [field]: value };
    onUpdate({ users: newUsers });
  };

  const updateConfirmPassword = (index: number, value: string) => {
    setConfirmPasswords(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div className={cn("space-y-6")}>
      <UserStepHeader />

      {errors.general && (
        <div className={cn("bg-destructive/10 border border-destructive rounded-lg p-4")}>
          <p className={cn("text-sm text-destructive")}>{errors.general}</p>
        </div>
      )}

      <div className={cn("space-y-6")}>
        {users.map((user, index) => (
          <UserForm
            key={index}
            user={user}
            index={index}
            users={users}
            errors={errors}
            onUpdateUser={updateUserField}
            onRemoveUser={removeUser}
            onUpdateConfirmPassword={updateConfirmPassword}
            confirmPasswords={confirmPasswords}
          />
        ))}

        <button
          type="button"
          onClick={addUser}
          className={cn(
            "w-full p-4 border-2 border-dashed border-border rounded-lg",
            "text-muted-foreground hover:text-foreground hover:border-success-primary",
            "transition-colors flex items-center justify-center gap-2",
            "focus:outline-none focus:ring-2 focus:ring-success-primary focus:ring-offset-2"
          )}
        >
          <PlusIcon className="w-5 h-5" />
          Add Another User
        </button>
      </div>

      <UserStepTips />

      <div className={cn("flex justify-end")}>
        <button
          onClick={handleNext}
          className={cn(
            "px-6 py-2 bg-success-primary text-white rounded-md",
            "hover:bg-success-primary/90 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-success-primary focus:ring-offset-2"
          )}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
