import { type Category } from "@/db/models/Category";

/**
 * @file src/db/models/TranslatedCategory.ts
 * @description Represents a category with translated content extracted from properties.
 * This interface simplifies working with categories by providing direct access to
 * translated name for a specific language.
 */
export interface TranslatedCategory {
  id: string;
  image?: Blob;
  name: string;
  pictograms?: string[];
}

/**
 * Converts a Category to a TranslatedCategory by extracting translations for the specified language
 */
export function translateCategory(category: Category, language: string): TranslatedCategory {
  const languageProps = category.properties?.[language] || {};
  return {
    ...category,
    name: languageProps.name || "",
  };
}