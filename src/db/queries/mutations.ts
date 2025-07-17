import { type PromiseExtended } from "dexie";

import { type Binder } from "@/db/models";
import { type Category } from "@/db/models";
import { type History } from "@/db/models";
import { type Pictogram } from "@/db/models";
import { type Setting } from "@/db/models";
import { type User } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

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
