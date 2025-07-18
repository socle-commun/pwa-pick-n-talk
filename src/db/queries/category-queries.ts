import { type PromiseExtended } from "dexie";

import { type Category } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Get categories from a specific binder ID by finding all pictograms in that binder
 * and extracting their category references
 */
export function getCategoriesFromBinderId(
  this: PickNTalkDB,
  binderId: string
): PromiseExtended<Category[]> {
  return this.transaction("r", this.pictograms, this.categories, () => {
    return this.getPictogramsFromBinderId(binderId).then((pictograms) => {
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
    });
  });
}

/**
 * Create a new category
 */
export function createCategory(this: PickNTalkDB, category: Category) {
  return this.categories.add(category);
}

/**
 * Update an existing category
 */
export function updateCategory(
  this: PickNTalkDB,
  category: Category
): PromiseExtended<void> {
  return this.categories.update(category.id, category).then(() => {});
}

/**
 * Delete a category and remove its references from all pictograms
 */
export function deleteCategory(this: PickNTalkDB, id: string) {
  return this.transaction("rw", this.pictograms, this.categories, () => {
    // Remove category from all pictograms that reference it
    this.pictograms.toCollection().modify((pictogram) => {
      if (pictogram.categories) {
        pictogram.categories = pictogram.categories.filter(catId => catId !== id);
      }
    });
    this.categories.delete(id);
  });
}