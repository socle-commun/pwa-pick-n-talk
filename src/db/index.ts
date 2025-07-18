import Dexie, { type PromiseExtended, type Table } from "dexie";

import { type Binder } from "@/db/models";
import { type Category } from "@/db/models";
import { type History } from "@/db/models";
import { type Pictogram } from "@/db/models";
import { type Setting } from "@/db/models";
import type { User } from "@/db/models";



import { populate } from "@/db/populate";

// Import extracted methods
import * as userQueries from "@/db/queries/user-queries";
import * as binderQueries from "@/db/queries/binder-queries";
import * as pictogramQueries from "@/db/queries/pictogram-queries";
import * as mutations from "@/db/queries/mutations";
import * as updates from "@/db/queries/updates";
import * as deletions from "@/db/queries/deletions";

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
    this.getHistory = userQueries.getHistory.bind(this);
    this.getPictogramsFromBinderId = pictogramQueries.getPictogramsFromBinderId.bind(this);
    this.getCategoriesFromPictograms = userQueries.getCategoriesFromPictograms.bind(this);

    // Binder queries
    this.getBinders = binderQueries.getBinders.bind(this);
    this.getBinder = binderQueries.getBinder.bind(this);

    // Pictogram queries
    this.getCategoriesFromBinderId = pictogramQueries.getCategoriesFromBinderId.bind(this);

    // Mutations
    this.createBinder = mutations.createBinder.bind(this);
    this.createCategory = mutations.createCategory.bind(this);
    this.createHistory = mutations.createHistory.bind(this);
    this.createPictogram = mutations.createPictogram.bind(this);
    this.createSetting = mutations.createSetting.bind(this);
    this.createUser = mutations.createUser.bind(this);

    // Updates
    this.updateBinder = updates.updateBinder.bind(this);
    this.updatePictogram = updates.updatePictogram.bind(this);
    this.updateCategory = updates.updateCategory.bind(this);
    this.updateUser = updates.updateUser.bind(this);

    // Deletions
    this.deleteBinder = deletions.deleteBinder.bind(this);
    this.deleteCategory = deletions.deleteCategory.bind(this);
    this.deletePictogram = deletions.deletePictogram.bind(this);
    this.deleteUser = deletions.deleteUser.bind(this);
  }

  // Method declarations for TypeScript (these will be assigned in constructor)
  // User queries
  public getUser!: (id: string) => PromiseExtended<User | undefined>;
  public getUserByEmail!: (email: string) => PromiseExtended<User | undefined>;
  public getHistory!: (entityId: string) => PromiseExtended<History[]>;
  public getPictogramsFromBinderId!: (binderId: string) => PromiseExtended<Pictogram[]>;
  public getCategoriesFromPictograms!: (pictograms: Pictogram[]) => PromiseExtended<Category[]>;

  // Binder queries
  public getBinders!: () => PromiseExtended<Binder[]>;
  public getBinder!: (id: string) => PromiseExtended<Binder | undefined>;

  // Pictogram queries
  public getCategoriesFromBinderId!: (binderId: string) => PromiseExtended<Category[]>;

  // Mutations
  public createBinder!: (binder: Binder) => PromiseExtended<string>;
  public createCategory!: (category: Category) => PromiseExtended<string>;
  public createHistory!: (history: History) => PromiseExtended<string>;
  public createPictogram!: (pictogram: Pictogram) => PromiseExtended<string>;
  public createSetting!: (setting: Setting) => PromiseExtended<string>;
  public createUser!: (user: User) => PromiseExtended<string>;

  // Updates
  public updateBinder!: (binder: Binder) => PromiseExtended<void>;
  public updatePictogram!: (pictogram: Pictogram) => PromiseExtended<void>;
  public updateCategory!: (category: Category) => PromiseExtended<void>;
  public updateUser!: (user: User) => PromiseExtended<void>;

  // Deletions
  public deleteBinder!: (binderId: string) => PromiseExtended<void>;
  public deleteCategory!: (id: string) => PromiseExtended<void>;
  public deletePictogram!: (id: string) => PromiseExtended<void>;
  public deleteUser!: (id: string) => PromiseExtended<void>;

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
