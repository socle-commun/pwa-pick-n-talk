import { type PromiseExtended } from "dexie";

import type { Category, History, Pictogram, User } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

export function getUser(this: PickNTalkDB, id: string): PromiseExtended<User | undefined> {
  return this.users.get(id);
}

export function getUserByEmail(this: PickNTalkDB, email: string): PromiseExtended<User | undefined> {
  return this.users.where({ email }).first();
}

export function getHistory(this: PickNTalkDB, entityId: string): PromiseExtended<History[]> {
  return this.history.where({ entityId }).toArray();
}



export function getCategoriesFromPictograms(
  this: PickNTalkDB,
  pictograms: Pictogram[]
): PromiseExtended<Category[]> {
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
    .toArray();
}
