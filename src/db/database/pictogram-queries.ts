import { type TranslatedCategory } from "@/db/entities/translated/TranslatedCategory";
import { type TranslatedPictogram } from "@/db/entities/translated/TranslatedPictogram";

import { type PickNTalkDB } from "../index";

export function getTranslatedPictogramsFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string,
  language: string
): Promise<TranslatedPictogram[]> {
  return this.transaction(
    "r",
    this.pictograms,
    this.settings,
    this.translations,
    () => {
      return this.getPictogramsFromBinderUuid(binderUuid).then(
        (pictograms) => {
          return this.translations
            .where("objectUuid")
            .anyOf(pictograms.map((pictogram) => pictogram.uuid))
            .toArray()
            .then((translations) => {
              return pictograms.map((pictogram) => {
                const pictogramTranslation = translations.find(
                  (translation) =>
                    translation.objectUuid === pictogram.uuid &&
                    translation.language === language &&
                    translation.key === "word"
                );
                return {
                  ...pictogram,
                  word: pictogramTranslation?.value || "",
                };
              });
            });
        }
      );
    }
  );
}

export function getTranslatedCategoriesFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string,
  language: string
): Promise<TranslatedCategory[]> {
  return this.transaction(
    "r",
    this.pictograms,
    this.categories,
    this.settings,
    this.translations,
    () => {
      return this.getPictogramsFromBinderUuid(binderUuid).then(
        (pictograms) => {
          return this.getCategoriesFromPictograms(pictograms).then(
            (categories) => {
              return this.translations
                .where("objectUuid")
                .anyOf(categories.map((category) => category.uuid))
                .toArray()
                .then((translations) => {
                  return categories.map((category) => {
                    const categoryTranslation = translations.find(
                      (translation) =>
                        translation.objectUuid === category.uuid &&
                        translation.language === language &&
                        translation.key === "name"
                    );
                    return {
                      ...category,
                      name: categoryTranslation?.value || "",
                    };
                  });
                });
            }
          );
        }
      );
    }
  );
}
