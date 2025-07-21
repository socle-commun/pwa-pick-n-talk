/**
 * @file src/components/partials/onboarding/UserAccountsStep.tsx
 * @description User accounts creation step for user onboarding setup flow.
 *
 * This component provides:
 * - Creation of multiple user accounts
 * - Reusable form component for user creation and edition
 * - Optional password functionality
 * - Fixed role (user)
 * - Personal settings configuration
 * - Real-time saving to users table via state management hooks
 */

import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import { AccountTypeButton } from "@/components/ui/data-input";
import { UserForm } from "@/components/partials/forms";

import { type User } from "@/db/models";
import { useUsers, useUserActions } from "@/utils/state/actions";
import cn from "@/utils/cn";

interface UserAccountsStepProps {
  onContinue?: () => void;
  className?: string;
}

export default function UserAccountsStep({ onContinue, className }: UserAccountsStepProps) {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Use hooks instead of direct db access
  const { usersByRole } = useUsers();
  const { deleteUserAccount } = useUserActions();
  const userRoleUsers = usersByRole("user");

  const handleAddUser = useCallback(() => {
    setEditingUser(null);
    setShowForm(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setShowForm(true);
  }, []);

  const handleDeleteUser = useCallback(async (user: User) => {
    if (window.confirm(t("forms.user.delete_confirm", "Are you sure you want to delete {{name}}?", { name: user.name }))) {
      try {
        await deleteUserAccount(user.id);
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(t("forms.errors.delete_failed", "Failed to delete user"));
      }
    }
  }, [deleteUserAccount, t]);

  const handleUserSaved = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  const getRoleDisplayName = () => {
    return t("users.roles.user", "User");
  };

  const getUserIcon = () => (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const getIconStyles = () => {
    return "feature-tertiary-secondary dark:bg-[color:var(--feature-tertiary-primary)]/20 feature-tertiary-primary dark:feature-tertiary-text";
  };

  return (
    <div className={cn("container mx-auto px-4 py-8 max-w-4xl", className)}>
      {/* Header Section */}
      <div className="text-center mb-8">
        <Heading level={1} className="text-3xl lg:text-4xl mb-4">
          {t("onboarding.users.title", "Setup User Accounts")}
        </Heading>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
          {t("onboarding.users.subtitle", "Create accounts for the primary communication users. Configure their personal preferences and accessibility settings.")}
        </p>
      </div>

      {/* Add User Button */}
      {!showForm && (
        <div className="mb-8">
          <AccountTypeButton
            title={t("onboarding.users.add_user", "Add User Account")}
            description={t("onboarding.users.user_description", "Create an account for someone who will use communication binders")}
            icon={getUserIcon()}
            onClick={handleAddUser}
            variant="primary"
            className="max-w-md mx-auto"
          />
        </div>
      )}

      {/* User Form */}
      {showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <UserForm
            user={editingUser || undefined}
            role="user"
            onSaved={handleUserSaved}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Existing Users List */}
      {userRoleUsers.length > 0 && !showForm && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
          <Heading level={2} className="text-xl mb-4">
            {t("onboarding.users.existing_accounts", "Created User Accounts")}
          </Heading>
          <div className="space-y-4">
            {userRoleUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "size-10 rounded-full flex items-center justify-center",
                    getIconStyles()
                  )}>
                    {getUserIcon()}
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {user.email} • {getRoleDisplayName()}
                    </p>
                    {/* Display configured settings count */}
                    {user.settings && Object.keys(user.settings).length > 0 && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {t("onboarding.users.settings_configured", "{{count}} personal settings configured", {
                          count: Object.keys(user.settings).length
                        })}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    outline
                    onClick={() => handleEditUser(user)}
                    className="text-sm px-3 py-1"
                  >
                    {t("forms.user.edit", "Edit")}
                  </Button>
                  <Button
                    color="red"
                    onClick={() => handleDeleteUser(user)}
                    className="text-sm px-3 py-1"
                  >
                    {t("forms.user.delete", "Delete")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      {!showForm && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onContinue} className="px-8 py-3">
            {userRoleUsers.length > 0
              ? t("onboarding.users.continue_with_accounts", "Continue with {{count}} user account(s)", { count: userRoleUsers.length })
              : t("onboarding.users.skip_accounts", "Continue without user accounts")
            }
          </Button>
        </div>
      )}
    </div>
  );
}
