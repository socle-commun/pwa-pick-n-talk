import type { Role } from "./Types";

/**
 * @file src/db/models/User.ts
 * @description Represents a user in the database.
 * Users can be caregivers, professionals, or end-users of the application.
 * Contains authentication, profile information, and settings.
 */
export interface User {
  id: string;

  name?: string;
  email: string;
  hash?: string;

  role: Role;

  settings: Record<string, boolean | number | string | object>;
  binders: string[];
}