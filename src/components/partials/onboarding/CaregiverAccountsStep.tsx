/**
 * @file src/components/partials/onboarding/CaregiverAccountsStep.tsx
 * @description Caregiver accounts creation step for user onboarding setup flow.
 *
 * This component provides:
 * - Creation of multiple caregiver and professional accounts
 * - Reusable form component for user creation and edition
 * - Optional password functionality
 * - Fixed roles (caregiver/professional)
 * - Real-time saving to users table via DexieJS
 */

import { useLiveQuery } from "dexie-react-hooks";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { UserForm } from "@/components/partials/forms";
import { Button } from "@/components/ui/actions";
import { UserAccountCard } from "@/components/ui/data-display";
import { AccountTypeButton } from "@/components/ui/data-input";
import { Heading } from "@/components/ui/typography";
import { db } from "@/db";
import { type User, type Role } from "@/db/models";
import cn from "@/utils/cn";

interface CaregiverAccountsStepProps {
  onContinue?: () => void;
  className?: string;
}

type AccountType = "caregiver" | "professional";

export default function CaregiverAccountsStep({ onContinue, className }: CaregiverAccountsStepProps) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType>("caregiver");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Get all users and filter by role in JavaScript
  const allUsers = useLiveQuery(() => db.users.toArray(), []) || [];

  const caregiverUsers = allUsers.filter(user => user.role === "caregiver");
  const professionalUsers = allUsers.filter(user => user.role === "professional");
  const filteredUsers = [...caregiverUsers, ...professionalUsers];

  const handleAddUser = useCallback((accountType: AccountType) => {
    setSelectedAccountType(accountType);
    setEditingUser(null);
    setShowForm(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setSelectedAccountType(user.role as AccountType);
    setEditingUser(user);
    setShowForm(true);
  }, []);

  const handleDeleteUser = useCallback(async (user: User) => {
    if (window.confirm(t("forms.user.delete_confirm", "Are you sure you want to delete {{name}}?", { name: user.name }))) {
      try {
        await db.deleteUser(user.id);
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(t("forms.errors.delete_failed", "Failed to delete user"));
      }
    }
  }, [t]);

  const handleUserSaved = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  const getRoleDisplayName = (role: Role) => {
    switch (role) {
      case "caregiver":
        return t("users.roles.caregiver", "Caregiver");
      case "professional":
        return t("users.roles.professional", "Professional");
      default:
        return role;
    }
  };

  const getAccountTypeIcon = (accountType: AccountType) => {
    return accountType === "caregiver" ? (
      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ) : (
      <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  };

  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-4xl", className)}>
      {/* Header Section */}
      <div className="text-center mb-8">
        <Heading level={1} className="text-3xl lg:text-4xl mb-4">
          {t("onboarding.caregivers.title", "Setup Caregiver Accounts")}
        </Heading>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
          {t("onboarding.caregivers.subtitle", "Add caregivers and professionals who will help manage communication binders.")}
        </p>
      </div>

      {/* Account Type Selection */}
      {!showForm && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <AccountTypeButton
            title={t("onboarding.caregivers.add_caregiver", "Add Caregiver")}
            description={t("onboarding.caregivers.caregiver_description", "Family members, friends, or support persons")}
            icon={getAccountTypeIcon("caregiver")}
            onClick={() => handleAddUser("caregiver")}
            variant="primary"
          />

          <AccountTypeButton
            title={t("onboarding.caregivers.add_professional", "Add Professional")}
            description={t("onboarding.caregivers.professional_description", "Healthcare workers, therapists, educators")}
            icon={getAccountTypeIcon("professional")}
            onClick={() => handleAddUser("professional")}
            variant="secondary"
          />
        </div>
      )}

      {/* User Form */}
      {showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <UserForm
            user={editingUser || undefined}
            role={selectedAccountType}
            onSaved={handleUserSaved}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Existing Users List */}
      {filteredUsers.length > 0 && !showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <Heading level={2} className="text-xl mb-4">
            {t("onboarding.caregivers.existing_accounts", "Created Accounts")}
          </Heading>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <UserAccountCard
                key={user.id}
                user={user}
                icon={getAccountTypeIcon(user.role as AccountType)}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                editLabel={t("forms.user.edit", "Edit")}
                deleteLabel={t("forms.user.delete", "Delete")}
                getRoleDisplayName={getRoleDisplayName}
              />
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {!showForm && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onContinue} className="px-8 py-3">
            {filteredUsers.length > 0
              ? t("onboarding.caregivers.continue_with_accounts", "Continue with {{count}} account(s)", { count: filteredUsers.length })
              : t("onboarding.caregivers.skip_accounts", "Continue without accounts")
            }
          </Button>
        </div>
      )}
    </div>
  );
}
