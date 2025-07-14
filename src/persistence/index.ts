import Dexie, { type PromiseExtended, type Table } from "dexie";

import { type Binder } from "@/persistence/entities/data/Binder";
import { type Category } from "@/persistence/entities/data/Category";
import { type Pictogram } from "@/persistence/entities/data/Pictogram";
import { type Setting } from "@/persistence/entities/data/Setting";
import { type Translation } from "@/persistence/entities/data/Translation";
import type { User } from "@/persistence/entities/data/User";

import { type TranslatedBinder } from "@/persistence/entities/translated/TranslatedBinder";
import { type TranslatedCategory } from "@/persistence/entities/translated/TranslatedCategory";
import { type TranslatedPictogram } from "@/persistence/entities/translated/TranslatedPictogram";

import { populate } from "@/persistence/populate";

export class PickNTalkDB extends Dexie {
  binders!: Table<Binder, string>;
  categories!: Table<Category, string>;
  pictograms!: Table<Pictogram, string>;
  settings!: Table<Setting, string>;
  translations!: Table<Translation, number>;
  users!: Table<User, string>;

  constructor() {
    super("PickNTalkDB");
    this.version(1).stores({
      binders: "&uuid",
      categories: "&uuid",
      pictograms: "&uuid, binderUuid, categoryUuid",
      settings: "&key",
      translations: "++id, &[objectUuid+language+key]",
    });
    this.version(2).stores({
      users: "&uuid",
    });
    this.version(3).stores({
      users: "&uuid, email",
    });
  }

  // #region Get
  public getUser(uuid: string): PromiseExtended<User | undefined> {
    return this.users.get(uuid);
  }

  public getUserByEmail(email: string): PromiseExtended<User | undefined> {
    return this.users.where({ email }).first();
  }

  private getPictogramsFromBinderUuid(binderUuid: string): PromiseExtended<Pictogram[]> {
    return this.pictograms.where({ binderUuid }).toArray();
  }

  private getCategoriesFromPictograms(pictograms: Pictogram[]): PromiseExtended<Category[]> {
    return this.categories
      .where("uuid")
      .anyOf(pictograms.map(pictogram => pictogram.categoryUuid))
      .toArray();
  }

  public getTranslatedBinders(language: string): PromiseExtended<TranslatedBinder[]> {
    return this.transaction("r", this.binders, this.translations, () => {
      return this.binders.toArray().then(binders => {
        return this.translations
          .where("objectUuid")
          .anyOf(binders.map(binder => binder.uuid))
          .toArray()
          .then(translations => {
            return binders.map(binder => {
              const binderTitleTranslation = translations.find(
                translation =>
                  translation.objectUuid === binder.uuid &&
                  translation.language === language &&
                  translation.key === "title",
              );
              const binderDescriptionTranslation = translations.find(
                translation =>
                  translation.objectUuid === binder.uuid &&
                  translation.language === language &&
                  translation.key === "description",
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

  public getTranslatedBinder(uuid: string, language: string): PromiseExtended<TranslatedBinder> {
    return this.transaction("r", this.binders, this.translations, () => {
      return this.binders.get(uuid).then(binder => {
        if (!binder) {
          return Promise.reject(new Error("Binder not found"));
        }
        return this.translations
          .where("objectUuid")
          .anyOf(binder.uuid)
          .toArray()
          .then(translations => {
            const binderTitleTranslation = translations.find(
              translation =>
                translation.objectUuid === binder.uuid &&
                translation.language === language &&
                translation.key === "title",
            );
            const binderDescriptionTranslation = translations.find(
              translation =>
                translation.objectUuid === binder.uuid &&
                translation.language === language &&
                translation.key === "description",
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

  public getTranslatedPictogramsFromBinderUuid(binderUuid: string, language: string): Promise<TranslatedPictogram[]> {
    return this.transaction("r", this.pictograms, this.settings, this.translations, () => {
      return this.getPictogramsFromBinderUuid(binderUuid).then(pictograms => {
        return this.translations
          .where("objectUuid")
          .anyOf(pictograms.map(pictogram => pictogram.uuid))
          .toArray()
          .then(translations => {
            return pictograms.map(pictogram => {
              const pictogramTranslation = translations.find(
                translation =>
                  translation.objectUuid === pictogram.uuid &&
                  translation.language === language &&
                  translation.key === "word",
              );
              return { ...pictogram, word: pictogramTranslation?.value || "" };
            });
          });
      });
    });
  }

  public getTranslatedCategoriesFromBinderUuid(binderUuid: string, language: string): Promise<TranslatedCategory[]> {
    return this.transaction("r", this.pictograms, this.categories, this.settings, this.translations, () => {
      return this.getPictogramsFromBinderUuid(binderUuid).then(pictograms => {
        return this.getCategoriesFromPictograms(pictograms).then(categories => {
          return this.translations
            .where("objectUuid")
            .anyOf(categories.map(category => category.uuid))
            .toArray()
            .then(translations => {
              return categories.map(category => {
                const categoryTranslation = translations.find(
                  translation =>
                    translation.objectUuid === category.uuid &&
                    translation.language === language &&
                    translation.key === "name",
                );
                return { ...category, name: categoryTranslation?.value || "" };
              });
            });
        });
      });
    });
  }
  // #endregion

  // #region Create
  public createBinder(binder: Binder) {
    return this.binders.add(binder);
  }

  public createCategory(category: Category) {
    return this.categories.add(category);
  }

  public createPictogram(pictogram: Pictogram) {
    return this.pictograms.add(pictogram);
  }

  public createSetting(setting: Setting) {
    return this.settings.add(setting);
  }

  public createTranslation(translation: Translation) {
    return this.translations.add(translation);
  }

  public createUser(user: User): PromiseExtended<string> {
    return this.users.add(user);
  }
  // #endregion

  // #region Update
  public updateTranslatedBinder(binder: TranslatedBinder, language: string): PromiseExtended<void> {
    return this.transaction("rw", this.binders, this.translations, () => {
      this.binders.update(binder.uuid, binder);
      this.translations.where({ objectUuid: binder.uuid, language, key: "title" }).modify({ value: binder.title });
      this.translations
        .where({ objectUuid: binder.uuid, language, key: "description" })
        .modify({ value: binder.description });
    });
  }

  public updateTranslatedPictogram(pictogram: TranslatedPictogram, language: string): PromiseExtended<void> {
    return this.transaction("rw", this.pictograms, this.translations, () => {
      this.pictograms.update(pictogram.uuid, pictogram);
      this.translations.where({ objectUuid: pictogram.uuid, language, key: "word" }).modify({ value: pictogram.word });
    });
  }

  public updateTranslatedCategory(category: TranslatedCategory, language: string): PromiseExtended<void> {
    return this.transaction("rw", this.categories, this.translations, () => {
      this.categories.update(category.uuid, category);
      this.translations.where({ objectUuid: category.uuid, language, key: "name" }).modify({ value: category.name });
    });
  }
  // #endregion

  // #region Delete
  public deleteBinder(binderUuid: string) {
    return this.transaction("rw", this.pictograms, this.binders, () => {
      this.pictograms.where({ binderUuid }).delete();
      this.binders.delete(binderUuid);
    });
  }

  public deleteCategory(uuid: string) {
    return this.transaction("rw", this.pictograms, this.categories, () => {
      this.pictograms.where({ categoryUuid: uuid }).delete();
      this.categories.delete(uuid);
    });
  }

  public deletePictogram(uuid: string) {
    this.pictograms.delete(uuid);
  }

  public deleteUser(uuid: string) {
    this.users.delete(uuid);
  }
  // #endregion
}

export const db = new PickNTalkDB();

db.on("populate", populate);
