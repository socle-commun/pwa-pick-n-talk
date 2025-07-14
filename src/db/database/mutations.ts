import { type PromiseExtended } from "dexie";

import { type Binder } from "@/db/entities/data/Binder";
import { type Category } from "@/db/entities/data/Category";
import { type History } from "@/db/entities/data/History";
import { type Pictogram } from "@/db/entities/data/Pictogram";
import { type Setting } from "@/db/entities/data/Setting";
import { type Translation } from "@/db/entities/data/Translation";
import type { User } from "@/db/entities/data/User";

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

export function createTranslation(this: PickNTalkDB, translation: Translation) {
  return this.translations.add(translation);
}

export function createUser(this: PickNTalkDB, user: User): PromiseExtended<string> {
  return this.users.add(user);
}
