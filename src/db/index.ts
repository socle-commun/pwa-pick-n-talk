import Dexie, { type PromiseExtended, type Table } from "dexie";

import { type Binder } from "@/db/models/Binder";
import { type Category } from "@/db/models/Category";
import { type History } from "@/db/models/History";
import { type Pictogram } from "@/db/models/Pictogram";
import { type Setting } from "@/db/models/Setting";
import type { User } from "@/db/models/User";



import { populate } from "@/db/populate";

// Import extracted methods
import * as userQueries from "./queries/user-queries";
import * as binderQueries from "./queries/binder-queries";
import * as pictogramQueries from "./queries/pictogram-queries";
import * as mutations from "./queries/mutations";
import * as updates from "./queries/updates";
import * as deletions from "./queries/deletions";

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
    this.getPictogramsFromBinderId = userQueries.getPictogramsFromBinderId.bind(this);
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
  public createBinder!: (binder: Binder) => any;
  public createCategory!: (category: Category) => any;
  public createHistory!: (history: History) => any;
  public createPictogram!: (pictogram: Pictogram) => any;
  public createSetting!: (setting: Setting) => any;
  public createUser!: (user: User) => PromiseExtended<string>;

  // Updates
  public updateBinder!: (binder: Binder) => PromiseExtended<void>;
  public updatePictogram!: (pictogram: Pictogram) => PromiseExtended<void>;
  public updateCategory!: (category: Category) => PromiseExtended<void>;

  // Deletions
  public deleteBinder!: (binderId: string) => any;
  public deleteCategory!: (id: string) => any;
  public deletePictogram!: (id: string) => void;
  public deleteUser!: (id: string) => void;
}

export const db = new PickNTalkDB();

db.on("populate", populate);
