import { type PromiseExtended } from "dexie";

import { type PickNTalkDB } from "@/db/index";
import { type Category, type Pictogram } from "@/db/models";


/**
 * Get all categories
 */
export function getCategories(this: PickNTalkDB): PromiseExtended<Category[]> {
  return this.categories.toArray();
}

/**
 * Get a category by ID
 */
export function getCategory(this: PickNTalkDB, id: string): PromiseExtended<Category | undefined> {
  return this.categories.get(id);
}

/**
 * Get categories from a specific binder ID by finding all pictograms in that binder
 * and extracting their category references
 */
export function getCategoriesFromBinderId(
  this: PickNTalkDB,
  binderId: string
): PromiseExtended<Category[]> {
  const extractCategoryIds = (pictograms: Pictogram[]): string[] => {
    const categoryIds = new Set<string>();
    for (const pictogram of pictograms) {
      if (pictogram.categories) {
        for (const categoryId of pictogram.categories) {
          categoryIds.add(categoryId);
        }
      }
    }
    return Array.from(categoryIds);
  };

  return this.transaction("r", this.pictograms, this.categories, () => {
    return this.getPictogramsFromBinderId(binderId).then((pictograms) => {
      const categoryIds = extractCategoryIds(pictograms);
      return this.categories
        .where("id")
        .anyOf(categoryIds)
        .toArray();
    });
  });
}

/**
 * Create a new category
 */
export function createCategory(this: PickNTalkDB, category: Category): PromiseExtended<string> {
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
export function deleteCategory(this: PickNTalkDB, id: string): PromiseExtended<void> {
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
