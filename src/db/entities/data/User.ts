import type { Role } from "./Types";

export interface User {
  uuid: string;

  name?: string;
  email: string;
  hash?: string;
  password?: string;

  role: Role;

  settings: Record<string, boolean | number | string>;
}
