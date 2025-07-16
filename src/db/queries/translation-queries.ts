import { type PromiseExtended } from "dexie";

import { type TranslatedBinder, translateBinder } from "@/db/models/TranslatedBinder";
import { type TranslatedCategory, translateCategory } from "@/db/models/TranslatedCategory";
import { type TranslatedPictogram, translatePictogram } from "@/db/models/TranslatedPictogram";

import { type PickNTalkDB } from "../index";

export function getTranslatedBinders(
  this: PickNTalkDB,
  language: string
): PromiseExtended<TranslatedBinder[]> {
  return this.binders.toArray().then(binders =>
    binders.map(binder => translateBinder(binder, language))
  );
}

export function getTranslatedBinder(
  this: PickNTalkDB,
  id: string,
  language: string
): PromiseExtended<TranslatedBinder | null> {
  return this.binders.get(id).then(binder =>
    binder ? translateBinder(binder, language) : null
  );
}

export function getTranslatedPictogramsFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string,
  language: string
): PromiseExtended<TranslatedPictogram[]> {
  return this.pictograms.where({ binderUuid }).toArray().then(pictograms =>
    pictograms.map(pictogram => translatePictogram(pictogram, language))
  );
}

export function getTranslatedCategoriesFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string,
  language: string
): PromiseExtended<TranslatedCategory[]> {
  return this.transaction("r", this.pictograms, this.categories, () => {
    return this.getPictogramsFromBinderUuid(binderUuid).then((pictograms) => {
      const categoryIds = new Set<string>();
      pictograms.forEach((pictogram) => {
        if (pictogram.categories) {
          pictogram.categories.forEach((categoryId) => {
            categoryIds.add(categoryId);
          });
        }
      });
      return this.categories
        .where("id")
        .anyOf(Array.from(categoryIds))
        .toArray()
        .then(categories =>
          categories.map(category => translateCategory(category, language))
        );
    });
  });
}
