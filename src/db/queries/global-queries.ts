import { type PromiseExtended } from "dexie";

import type { Category, Pictogram } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Get categories from a collection of pictograms
 * This is a cross-domain operation that works with both pictograms and categories
 */
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

export async function isEmpty(this: PickNTalkDB): Promise<boolean> {
  try {
    const binderCount = await this.binders.count();
    const categoryCount = await this.categories.count();
    const historyCount = await this.history.count();
    const pictogramCount = await this.pictograms.count();
    const settingsCount = await this.settings.count();
    const usersCount = await this.users.count();

    // Database is empty if there are no binders, pictograms, categories, or history
    return binderCount === 0 && historyCount === 0 && categoryCount === 0 && pictogramCount === 0 && settingsCount === 0 && usersCount === 0;
  } catch (error) {
    console.error("Failed to check if database is empty:", error);
    // In case of error, assume database is not empty to avoid incorrect redirects
    return false;
  }
}
