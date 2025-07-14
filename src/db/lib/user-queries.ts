import { type PromiseExtended } from "dexie";

import { type Category } from "@/db/entities/data/Category";
import { type History } from "@/db/entities/data/History";
import { type Pictogram } from "@/db/entities/data/Pictogram";
import type { User } from "@/db/entities/data/User";

import { type PickNTalkDB } from "../index";

export function getUser(this: PickNTalkDB, uuid: string): PromiseExtended<User | undefined> {
  return this.users.get(uuid);
}

export function getUserByEmail(this: PickNTalkDB, email: string): PromiseExtended<User | undefined> {
  return this.users.where({ email }).first();
}

export function getHistory(this: PickNTalkDB, entityId: string): PromiseExtended<History[]> {
  return this.history.where({ entityId }).toArray();
}

export function getPictogramsFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string
): PromiseExtended<Pictogram[]> {
  return this.pictograms.where({ binderUuid }).toArray();
}

export function getCategoriesFromPictograms(
  this: PickNTalkDB,
  pictograms: Pictogram[]
): PromiseExtended<Category[]> {
  const categoryUuids = new Set<string>();
  pictograms.forEach((pictogram) => {
    if (pictogram.categories) {
      pictogram.categories.forEach((categoryUuid) => {
        categoryUuids.add(categoryUuid);
      });
    }
  });
  return this.categories
    .where("uuid")
    .anyOf(Array.from(categoryUuids))
    .toArray();
}
