import { type PromiseExtended } from "dexie";

import { type Binder } from "@/db/models/Binder";
import { type Category } from "@/db/models/Category";
import { type History } from "@/db/models/History";
import { type Pictogram } from "@/db/models/Pictogram";
import { type Setting } from "@/db/models/Setting";
import type { User } from "@/db/models/User";

import { type PickNTalkDB } from "../index";

export function createBinder(this: PickNTalkDB, binder: Binder) {
  return this.binders.add(binder);
}

export function createCategory(this: PickNTalkDB, category: Category) {
  return this.categories.add(category);
}

export function createHistory(this: PickNTalkDB, history: History) {
  return this.history.add(history);
}

export function createPictogram(this: PickNTalkDB, pictogram: Pictogram) {
  return this.pictograms.add(pictogram);
}

export function createSetting(this: PickNTalkDB, setting: Setting) {
  return this.settings.add(setting);
}

export function createUser(this: PickNTalkDB, user: User): PromiseExtended<string> {
  return this.users.add(user);
}