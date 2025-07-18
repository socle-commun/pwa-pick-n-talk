import { type Setting } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Create a new setting
 */
export function createSetting(this: PickNTalkDB, setting: Setting) {
  return this.settings.add(setting);
}
