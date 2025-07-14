import Dexie, { type PromiseExtended, type Table } from "dexie";

import { type Binder } from "@/db/entities/data/Binder";
import { type Category } from "@/db/entities/data/Category";
import { type History } from "@/db/entities/data/History";
import { type Pictogram } from "@/db/entities/data/Pictogram";
import { type Setting } from "@/db/entities/data/Setting";
import { type Translation } from "@/db/entities/data/Translation";
import type { User } from "@/db/entities/data/User";

import { type TranslatedBinder } from "@/db/entities/translated/TranslatedBinder";
import { type TranslatedCategory } from "@/db/entities/translated/TranslatedCategory";
import { type TranslatedPictogram } from "@/db/entities/translated/TranslatedPictogram";

import { populate } from "@/db/populate";

// Import extracted methods
import * as userQueries from "./database/user-queries";
import * as binderQueries from "./database/binder-queries";
import * as pictogramQueries from "./database/pictogram-queries";
import * as mutations from "./database/mutations";
import * as updates from "./database/updates";
import * as deletions from "./database/deletions";

export class PickNTalkDB extends Dexie {
  binders!: Table<Binder, string>;
  categories!: Table<Category, string>;
  history!: Table<History, string>;
  pictograms!: Table<Pictogram, string>;
  settings!: Table<Setting, string>;
  translations!: Table<Translation, number>;
  users!: Table<User, string>;

  constructor() {
    super("PickNTalkDB");
    this.version(1).stores({
      binders: "&uuid",
      categories: "&uuid",
      pictograms: "&uuid, binderUuid",
      settings: "&key",
      translations: "++id, &[objectUuid+language+key]",
    });
    this.version(2).stores({
      users: "&uuid",
    });
    this.version(3).stores({
      users: "&uuid, email",
    });
    this.version(4).stores({
      history: "&uuid, entityType, entityId, performedBy, timestamp",
    });

    this.getUser = userQueries.getUser.bind(this);
    this.getUserByEmail = userQueries.getUserByEmail.bind(this);
    this.getHistory = userQueries.getHistory.bind(this);
    this.getPictogramsFromBinderUuid = userQueries.getPictogramsFromBinderUuid.bind(this);
    this.getCategoriesFromPictograms = userQueries.getCategoriesFromPictograms.bind(this);
    this.getTranslatedBinders = binderQueries.getTranslatedBinders.bind(this);
    this.getTranslatedBinder = binderQueries.getTranslatedBinder.bind(this);
    this.getTranslatedPictogramsFromBinderUuid = pictogramQueries.getTranslatedPictogramsFromBinderUuid.bind(this);
    this.getTranslatedCategoriesFromBinderUuid = pictogramQueries.getTranslatedCategoriesFromBinderUuid.bind(this);

    this.createBinder = mutations.createBinder.bind(this);
    this.createCategory = mutations.createCategory.bind(this);
    this.createHistory = mutations.createHistory.bind(this);
    this.createPictogram = mutations.createPictogram.bind(this);
    this.createSetting = mutations.createSetting.bind(this);
    this.createTranslation = mutations.createTranslation.bind(this);
    this.createUser = mutations.createUser.bind(this);

    this.updateTranslatedBinder = updates.updateTranslatedBinder.bind(this);
    this.updateTranslatedPictogram = updates.updateTranslatedPictogram.bind(this);
    this.updateTranslatedCategory = updates.updateTranslatedCategory.bind(this);

    this.deleteBinder = deletions.deleteBinder.bind(this);
    this.deleteCategory = deletions.deleteCategory.bind(this);
    this.deletePictogram = deletions.deletePictogram.bind(this);
    this.deleteUser = deletions.deleteUser.bind(this);
  }

  // Method declarations for TypeScript (these will be assigned in constructor)
  public getUser!: (uuid: string) => PromiseExtended<User | undefined>;
  public getUserByEmail!: (email: string) => PromiseExtended<User | undefined>;
  public getHistory!: (entityId: string) => PromiseExtended<History[]>;
  public getPictogramsFromBinderUuid!: (binderUuid: string) => PromiseExtended<Pictogram[]>;
  public getCategoriesFromPictograms!: (pictograms: Pictogram[]) => PromiseExtended<Category[]>;
  public getTranslatedBinders!: (language: string) => PromiseExtended<TranslatedBinder[]>;
  public getTranslatedBinder!: (uuid: string, language: string) => PromiseExtended<TranslatedBinder>;
  public getTranslatedPictogramsFromBinderUuid!: (binderUuid: string, language: string) => Promise<TranslatedPictogram[]>;
  public getTranslatedCategoriesFromBinderUuid!: (binderUuid: string, language: string) => Promise<TranslatedCategory[]>;
  public createBinder!: (binder: Binder) => any;
  public createCategory!: (category: Category) => any;
  public createHistory!: (history: History) => any;
  public createPictogram!: (pictogram: Pictogram) => any;
  public createSetting!: (setting: Setting) => any;
  public createTranslation!: (translation: Translation) => any;
  public createUser!: (user: User) => PromiseExtended<string>;
  public updateTranslatedBinder!: (binder: TranslatedBinder, language: string) => PromiseExtended<void>;
  public updateTranslatedPictogram!: (pictogram: TranslatedPictogram, language: string) => PromiseExtended<void>;
  public updateTranslatedCategory!: (category: TranslatedCategory, language: string) => PromiseExtended<void>;
  public deleteBinder!: (binderUuid: string) => any;
  public deleteCategory!: (uuid: string) => any;
  public deletePictogram!: (uuid: string) => void;
  public deleteUser!: (uuid: string) => void;
}

export const db = new PickNTalkDB();

db.on("populate", populate);
