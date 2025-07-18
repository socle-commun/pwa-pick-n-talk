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
