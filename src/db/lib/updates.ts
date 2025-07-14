import { type PromiseExtended } from "dexie";

import { type TranslatedBinder } from "@/db/entities/translated/TranslatedBinder";
import { type TranslatedCategory } from "@/db/entities/translated/TranslatedCategory";
import { type TranslatedPictogram } from "@/db/entities/translated/TranslatedPictogram";

import { type PickNTalkDB } from "../index";

export function updateTranslatedBinder(
  this: PickNTalkDB,
  binder: TranslatedBinder,
  language: string
): PromiseExtended<void> {
  return this.transaction("rw", this.binders, this.translations, () => {
    this.binders.update(binder.uuid, binder);
    this.translations
      .where({ objectUuid: binder.uuid, language, key: "title" })
      .modify({ value: binder.title });
    this.translations
      .where({ objectUuid: binder.uuid, language, key: "description" })
      .modify({ value: binder.description });
  });
}

export function updateTranslatedPictogram(
  this: PickNTalkDB,
  pictogram: TranslatedPictogram,
  language: string
): PromiseExtended<void> {
  return this.transaction("rw", this.pictograms, this.translations, () => {
    this.pictograms.update(pictogram.uuid, pictogram);
    this.translations
      .where({ objectUuid: pictogram.uuid, language, key: "word" })
      .modify({ value: pictogram.word });
  });
}

export function updateTranslatedCategory(
  this: PickNTalkDB,
  category: TranslatedCategory,
  language: string
): PromiseExtended<void> {
  return this.transaction("rw", this.categories, this.translations, () => {
    this.categories.update(category.uuid, category);
    this.translations
      .where({ objectUuid: category.uuid, language, key: "name" })
      .modify({ value: category.name });
  });
}
