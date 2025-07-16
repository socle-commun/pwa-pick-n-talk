/**
 * @file src/db/models/Setting.ts
 * @description Represents application settings stored in the database.
 * Settings are key-value pairs that control application behavior and user preferences.
 */
export interface Setting {
  key: string;
  value: boolean | number | string | object;
}