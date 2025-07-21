/**
 * @file src/components/partials/forms/user-form-utils.ts
 * @description Helper utilities for UserForm component.
 */

import type { TFunction } from "react-i18next";
import type { Role } from "@/db/models";

export const getRoleDisplayName = (role: Role, t: TFunction) => {
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
