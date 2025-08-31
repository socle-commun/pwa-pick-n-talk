/**
 * @file src/components/partials/forms/UserForm.tsx
 * @description Reusable form component for creating and editing user accounts.
 *
 * This component provides:
 * - User creation and editing functionality
 * - Support for caregiver and professional roles
 * - Optional password field
 * - Real-time validation using Zod schema
 * - Automatic saving to database
 */

import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Typography } from "@mui/material";
import { Form, FormInput } from "@/components/ui/forms";
import { db } from "@/db";
import { UserSchema, type User, type Role } from "@/db/models";

// Form data schema for user creation/editing
const UserFormSchema = UserSchema.partial({
  hash: true,
  id: true,
  settings: true,
  binders: true,
}).extend({
  password: UserSchema.shape.hash.optional(),
});

type UserFormData = {
  name: string;
  email: string;
  password?: string;
  role: Role;
};

interface UserFormProps {
  user?: User;
  role: "caregiver" | "professional";
  onSaved?: (user: User) => void;
  onCancel?: () => void;
  className?: string;
}

export default function UserForm({
  user,
  role,
  onSaved,
  onCancel,
  className,
}: UserFormProps) {
  const { t } = useTranslation();
  const [isSaving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const isEditing = !!user;

  const initialValues: UserFormData = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role,
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
        settings: user?.settings || {},
        binders: user?.binders || [],
      };

      if (isEditing) {
        await db.updateUser(userData);
      } else {
        await db.createUser(userData);
      }

      setLastSaved(new Date());
      onSaved?.(userData);
    } catch (error) {
      console.error("Failed to save user:", error);
      throw new Error(t("forms.errors.save_failed", "Failed to save user"));
    } finally {
      setSaving(false);
    }
  }, [user, isEditing, onSaved, t]);

  const handleSubmit = async (data: UserFormData) => {
    await saveUser(data);
  };

  const getRoleDisplayName = (role: Role) => {
    switch (role) {
      case "caregiver":
        return t("users.roles.caregiver", "Caregiver");
      case "professional":
        return t("users.roles.professional", "Professional");
      case "user":
        return t("users.roles.user", "User");
      default:
        return role;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div >
        <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
          {isEditing
            ? t("forms.user.edit_title", "Edit {{role}}", { role: getRoleDisplayName(role) })
            : t("forms.user.create_title", "Add {{role}}", { role: getRoleDisplayName(role) })
          }
        </Typography>

        {lastSaved && (
          <p >
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
        
      >
        <div >
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
        <p >
          {t("forms.user.password_help", "Password is optional. If not set, the user will need to create one on first sign-in.")}
        </p>

        {/* Role display (read-only) */}
        <div >
          <label >
            {t("forms.user.role", "Role")}
          </label>
          <div >
            {getRoleDisplayName(role)}
          </div>
          <p >
            {t("forms.user.role_help", "Role is determined by the account type being created")}
          </p>
        </div>

        <div >
          <Button
            type="submit"
            disabled={isSaving}
            
          >
            {(() => {
              if (isSaving) {
                return t("forms.user.saving", "Saving...");
              }
              if (isEditing) {
                return t("forms.user.update", "Update {{role}}", { role: getRoleDisplayName(role) });
              }
              return t("forms.user.create", "Create {{role}}", { role: getRoleDisplayName(role) });
            })()}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outlined"
              onClick={onCancel}
              
            >
              {t("forms.user.cancel", "Cancel")}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
