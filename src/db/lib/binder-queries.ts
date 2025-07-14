import { type PromiseExtended } from "dexie";

import { type TranslatedBinder } from "@/db/entities/translated/TranslatedBinder";

import { type PickNTalkDB } from "../index";

export function getTranslatedBinders(
  this: PickNTalkDB,
  language: string
): PromiseExtended<TranslatedBinder[]> {
  return this.transaction("r", this.binders, this.translations, () => {
    return this.binders.toArray().then((binders) => {
      return this.translations
        .where("objectUuid")
        .anyOf(binders.map((binder) => binder.uuid))
        .toArray()
        .then((translations) => {
          return binders.map((binder) => {
            const binderTitleTranslation = translations.find(
              (translation) =>
                translation.objectUuid === binder.uuid &&
                translation.language === language &&
                translation.key === "title"
            );
            const binderDescriptionTranslation = translations.find(
              (translation) =>
                translation.objectUuid === binder.uuid &&
                translation.language === language &&
                translation.key === "description"
            );
            return {
              ...binder,
              title: binderTitleTranslation?.value || "",
              description: binderDescriptionTranslation?.value || "",
            };
          });
        });
    });
  });
}

export function getTranslatedBinder(
  this: PickNTalkDB,
  uuid: string,
  language: string
): PromiseExtended<TranslatedBinder> {
  return this.transaction("r", this.binders, this.translations, () => {
    return this.binders.get(uuid).then((binder) => {
      if (!binder) {
        return Promise.reject(new Error("Binder not found"));
      }
      return this.translations
        .where("objectUuid")
        .anyOf(binder.uuid)
        .toArray()
        .then((translations) => {
          const binderTitleTranslation = translations.find(
            (translation) =>
              translation.objectUuid === binder.uuid &&
              translation.language === language &&
              translation.key === "title"
          );
          const binderDescriptionTranslation = translations.find(
            (translation) =>
              translation.objectUuid === binder.uuid &&
              translation.language === language &&
              translation.key === "description"
          );
          return {
            ...binder,
            title: binderTitleTranslation?.value || "",
            description: binderDescriptionTranslation?.value || "",
          };
        });
    });
  });
}
