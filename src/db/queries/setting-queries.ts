import { type PromiseExtended } from "dexie";

import { type PickNTalkDB } from "@/db/index";
import { type Setting } from "@/db/models";


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
export function updateSetting(this: PickNTalkDB, setting: Setting): PromiseExtended<number> {
  return this.settings.update(setting.key, setting);
}

/**
 * Upsert a setting (create or update)
 */
export function upsertSetting(this: PickNTalkDB, setting: Setting): PromiseExtended<string> {
  return this.settings.put(setting);
}
