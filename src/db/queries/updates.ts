import { type PromiseExtended } from "dexie";

import { type Binder } from "@/db/models";
import { type Category } from "@/db/models";
import { type Pictogram } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

export function updateBinder(
  this: PickNTalkDB,
  binder: Binder
): PromiseExtended<void> {
  return this.binders.update(binder.id, binder).then(() => {});
}

export function updatePictogram(
  this: PickNTalkDB,
  pictogram: Pictogram
): PromiseExtended<void> {
  return this.pictograms.update(pictogram.id, pictogram).then(() => {});
}

export function updateCategory(
  this: PickNTalkDB,
  category: Category
): PromiseExtended<void> {
  return this.categories.update(category.id, category).then(() => {});
}
