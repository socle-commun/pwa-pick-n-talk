import Dexie, { type PromiseExtended, type Table } from "dexie";

import { type Binder } from "@/db/models";
import { type Category } from "@/db/models";
import { type History } from "@/db/models";
import { type Pictogram } from "@/db/models";
import { type Setting } from "@/db/models";
import type { User } from "@/db/models";



import { populate } from "@/db/populate";

// Import extracted methods organized by domain
import * as userQueries from "@/db/queries/user-queries";
import * as binderQueries from "@/db/queries/binder-queries";
import * as pictogramQueries from "@/db/queries/pictogram-queries";
import * as categoryQueries from "@/db/queries/category-queries";
import * as historyQueries from "@/db/queries/history-queries";
import * as settingQueries from "@/db/queries/setting-queries";
import * as globalQueries from "@/db/queries/global-queries";

export class PickNTalkDB extends Dexie {
  binders!: Table<Binder, string>;
  categories!: Table<Category, string>;
  history!: Table<History, string>;
  pictograms!: Table<Pictogram, string>;
  settings!: Table<Setting, string>;
  users!: Table<User, string>;

  constructor() {
    super("pick-n-talk");
    this.version(1).stores({
      binders: "&id, author, isFavorite, pictograms, users",
      categories: "&id, pictograms",
      pictograms: "&id, binder, isFavorite, categories",
      settings: "&key",
      users: "&id, email",
      history: "&id, entityType, entityId, performedBy, timestamp",
    });

    // User queries
    this.getUser = userQueries.getUser.bind(this);
    this.getUserByEmail = userQueries.getUserByEmail.bind(this);
    this.getAllUsers = userQueries.getAllUsers.bind(this);
    this.createUser = userQueries.createUser.bind(this);
    this.updateUser = userQueries.updateUser.bind(this);
    this.deleteUser = userQueries.deleteUser.bind(this);

    // Binder queries
    this.getBinders = binderQueries.getBinders.bind(this);
    this.getBinder = binderQueries.getBinder.bind(this);
    this.createBinder = binderQueries.createBinder.bind(this);
    this.updateBinder = binderQueries.updateBinder.bind(this);
    this.deleteBinder = binderQueries.deleteBinder.bind(this);

    // Pictogram queries
    this.getPictogramsFromBinderId = pictogramQueries.getPictogramsFromBinderId.bind(this);
    this.createPictogram = pictogramQueries.createPictogram.bind(this);
    this.updatePictogram = pictogramQueries.updatePictogram.bind(this);
    this.deletePictogram = pictogramQueries.deletePictogram.bind(this);

    // Category queries
    this.getCategories = categoryQueries.getCategories.bind(this);
    this.getCategory = categoryQueries.getCategory.bind(this);
    this.getCategoriesFromBinderId = categoryQueries.getCategoriesFromBinderId.bind(this);
    this.createCategory = categoryQueries.createCategory.bind(this);
    this.updateCategory = categoryQueries.updateCategory.bind(this);
    this.deleteCategory = categoryQueries.deleteCategory.bind(this);

    // History queries
    this.getHistory = historyQueries.getHistory.bind(this);
    this.createHistory = historyQueries.createHistory.bind(this);

    // Setting queries
    this.getSettings = settingQueries.getSettings.bind(this);
    this.getSetting = settingQueries.getSetting.bind(this);
    this.createSetting = settingQueries.createSetting.bind(this);
    this.updateSetting = settingQueries.updateSetting.bind(this);
    this.upsertSetting = settingQueries.upsertSetting.bind(this);

    // Global queries
    this.getCategoriesFromPictograms = globalQueries.getCategoriesFromPictograms.bind(this);
  }

  // Method declarations for TypeScript (these will be assigned in constructor)
  // User queries
  public getUser!: (id: string) => PromiseExtended<User | undefined>;
  public getUserByEmail!: (email: string) => PromiseExtended<User | undefined>;
  public getAllUsers!: () => PromiseExtended<User[]>;
  public createUser!: (user: User) => PromiseExtended<string>;
  public updateUser!: (user: User) => PromiseExtended<void>;
  public deleteUser!: (id: string) => PromiseExtended<void>;

  // Binder queries
  public getBinders!: () => PromiseExtended<Binder[]>;
  public getBinder!: (id: string) => PromiseExtended<Binder | undefined>;
  public createBinder!: (binder: Binder) => PromiseExtended<string>;
  public updateBinder!: (binder: Binder) => PromiseExtended<void>;
  public deleteBinder!: (binderId: string) => PromiseExtended<void>;

  // Pictogram queries
  public getPictogramsFromBinderId!: (binderId: string) => PromiseExtended<Pictogram[]>;
  public createPictogram!: (pictogram: Pictogram) => PromiseExtended<string>;
  public updatePictogram!: (pictogram: Pictogram) => PromiseExtended<void>;
  public deletePictogram!: (id: string) => PromiseExtended<void>;

  // Category queries
  public getCategories!: () => PromiseExtended<Category[]>;
  public getCategory!: (id: string) => PromiseExtended<Category | undefined>;
  public getCategoriesFromBinderId!: (binderId: string) => PromiseExtended<Category[]>;
  public createCategory!: (category: Category) => PromiseExtended<string>;
  public updateCategory!: (category: Category) => PromiseExtended<void>;
  public deleteCategory!: (id: string) => PromiseExtended<void>;

  // History queries
  public getHistory!: (entityId: string) => PromiseExtended<History[]>;
  public createHistory!: (history: History) => PromiseExtended<string>;

  // Setting queries
  public getSettings!: () => PromiseExtended<Setting[]>;
  public getSetting!: (key: string) => PromiseExtended<Setting | undefined>;
  public createSetting!: (setting: Setting) => PromiseExtended<string>;
  public updateSetting!: (setting: Setting) => PromiseExtended<number>;
  public upsertSetting!: (setting: Setting) => PromiseExtended<string>;

  // Global queries
  public getCategoriesFromPictograms!: (pictograms: Pictogram[]) => PromiseExtended<Category[]>;

  // Database state checks
  public async isEmpty(): Promise<boolean> {
    try {
      const binderCount = await this.binders.count();
      const pictogramCount = await this.pictograms.count();
      const categoryCount = await this.categories.count();

      // Database is empty if there are no binders, pictograms, or categories
      return binderCount === 0 && pictogramCount === 0 && categoryCount === 0;
    } catch (error) {
      console.error("Failed to check if database is empty:", error);
      // In case of error, assume database is not empty to avoid incorrect redirects
      return false;
    }
  }
}

export const db = new PickNTalkDB();

db.on("populate", populate);
