/**
 * @file src/components/partials/forms/UserForm.tsx
 * @description Reusable form component for creating and editing user accounts.
 *
 * This component provides:
 * - User creation and editing functionality
 * - Support for caregiver and professional roles
 * - Optional password field
 * - Real-time validation using Zod schema
 * - Automatic saving to database via state management hooks
 */

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Form, FormInput } from "@/components/ui/forms";
import { Button } from "@/components/ui/actions";
import { Heading } from "@/components/ui/typography";
import { UserSettingsFormPanel } from "@/components/ui/data-input";
import { UserSchema, type User, type Role } from "@/db/models";
import { useUserActions } from "@/utils/state/actions";
import { getRoleDisplayName } from "./user-form-utils";
import { type DaltonismMode } from "@/utils/theme";
import cn from "@/utils/cn";

const UserFormSchema = UserSchema.partial({
  hash: true, id: true, binders: true,
}).extend({
  password: UserSchema.shape.hash.optional(),
  settings: z.object({
    language: z.string().default("en"),
    themeMode: z.enum(["light", "dark"]).default("light"),
    fontSize: z.enum(["normal", "large", "extra-large"]).default("normal"),
    daltonismMode: z.enum(["default", "protanopia", "deuteranopia", "tritanopia"]).default("default"),
    highContrast: z.boolean().default(false),
  }).default({ language: "en", themeMode: "light", fontSize: "normal", daltonismMode: "default", highContrast: false }),
});

type UserFormData = {
  name: string; email: string; password?: string; role: Role;
  settings: { language: string; themeMode: "light" | "dark"; fontSize: "normal" | "large" | "extra-large"; daltonismMode: DaltonismMode; highContrast: boolean; };
};

interface UserFormProps {
  user?: User; role: "user" | "caregiver" | "professional";
  onSaved?: (user: User) => void; onCancel?: () => void; className?: string;
}

export default function UserForm({ user, role, onSaved, onCancel, className }: UserFormProps) {
  const { t } = useTranslation();
  const [isSaving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { createUserAccount, updateUserAccount } = useUserActions();
  const isEditing = !!user;
  const isUserRole = role === "user";

  const initialValues: UserFormData = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role,
    settings: {
      language: typeof user?.settings?.language === "string" ? user.settings.language : "en",
      themeMode: (user?.settings?.themeMode === "light" || user?.settings?.themeMode === "dark") ? user.settings.themeMode : "light",
      fontSize: (user?.settings?.fontSize === "normal" || user?.settings?.fontSize === "large" || user?.settings?.fontSize === "extra-large") ? user.settings.fontSize : "normal",
      daltonismMode: (user?.settings?.daltonismMode === "protanopia" || user?.settings?.daltonismMode === "deuteranopia" || user?.settings?.daltonismMode === "tritanopia") ? user.settings.daltonismMode : "default",
      highContrast: typeof user?.settings?.highContrast === "boolean" ? user.settings.highContrast : false,
    },
  };

  const saveUser = useCallback(async (data: UserFormData) => {
    setSaving(true);
    try {
      const bcrypt = await import("bcryptjs");
      const userData: User = {
        id: user?.id || crypto.randomUUID(),
        name: data.name,
        email: data.email,
        hash: data.password ? await bcrypt.hash(data.password, 10) : user?.hash,
        role: data.role,
        settings: data.settings,
        binders: user?.binders || [],
      };

      if (isEditing) {
        await updateUserAccount(userData);
      } else {
        await createUserAccount(userData);
      }

      setLastSaved(new Date());
      onSaved?.(userData);
    } catch (error) {
      console.error("Failed to save user:", error);
      throw new Error(t("forms.errors.save_failed", "Failed to save user"));
    } finally {
      setSaving(false);
    }
  }, [user, isEditing, createUserAccount, updateUserAccount, onSaved, t]);

  const handleSubmit = async (data: UserFormData) => {
    await saveUser(data);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <Heading level={3} className="text-lg font-medium">
          {isEditing
            ? t("forms.user.edit_title", "Edit {{role}}", { role: getRoleDisplayName(role, t) })
            : t("forms.user.create_title", "Add {{role}}", { role: getRoleDisplayName(role, t) })
          }
        </Heading>
        {lastSaved && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("forms.user.last_saved", "Last saved: {{time}}", {
              time: lastSaved.toLocaleTimeString()
            })}
          </p>
        )}
      </div>

      <Form<UserFormData>
        schema={UserFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            name="name"
            label={t("forms.user.name", "Full Name")}
            required
            autoComplete="name"
            placeholder={t("forms.user.name_placeholder", "Enter full name")}
          />
          <FormInput
            name="email"
            label={t("forms.user.email", "Email Address")}
            type="email"
            required
            autoComplete="email"
            placeholder={t("forms.user.email_placeholder", "Enter email address")}
          />
        </div>

        <FormInput
          name="password"
          label={t("forms.user.password", "Password")}
          type="password"
          autoComplete={isEditing ? "new-password" : "password"}
          placeholder={
            isEditing
              ? t("forms.user.password_placeholder_edit", "Leave blank to keep current password")
              : t("forms.user.password_placeholder", "Enter password (optional)")
          }
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 -mt-4">
          {t("forms.user.password_help", "Password is optional. If not set, the user will need to create one on first sign-in.")}
        </p>
        {/* Role display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {t("forms.user.role", "Role")}
          </label>
          <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm text-zinc-700 dark:text-zinc-300">
            {getRoleDisplayName(role, t)}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {t("forms.user.role_help", "Role is determined by the account type being created")}
          </p>
        </div>

        {/* Personal Settings for User Role */}
        {isUserRole && (
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
            <UserSettingsFormPanel />
          </div>
        )}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSaving}
            className="flex-1 sm:flex-none"
          >
            {(() => {
              if (isSaving) return t("forms.user.saving", "Saving...");
              if (isEditing) return t("forms.user.update", "Update {{role}}", { role: getRoleDisplayName(role, t) });
              return t("forms.user.create", "Create {{role}}", { role: getRoleDisplayName(role, t) });
            })()}
          </Button>
          {onCancel && (
            <Button
              type="button"
              outline
              onClick={onCancel}
              className="flex-1 sm:flex-none"
            >
              {t("forms.user.cancel", "Cancel")}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
