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
