import { type PromiseExtended } from "dexie";

import { type Setting } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Get all settings
 */
export function getSettings(this: PickNTalkDB): PromiseExtended<Setting[]> {
  return this.settings.toArray();
}

/**
 * Get a setting by key
 */
export function getSetting(this: PickNTalkDB, key: string): PromiseExtended<Setting | undefined> {
  return this.settings.get(key);
}

/**
 * Create a new setting
 */
export function createSetting(this: PickNTalkDB, setting: Setting): PromiseExtended<string> {
  return this.settings.add(setting);
}

/**
 * Update an existing setting
 */
export function updateSetting(this: PickNTalkDB, setting: Setting): PromiseExtended<void> {
  return this.settings.put(setting).then(() => {});
}

/**
 * Create or update a setting (upsert)
 */
export function upsertSetting(this: PickNTalkDB, setting: Setting): PromiseExtended<string> {
  return this.settings.put(setting);
}
