import { type Binder } from "@/db/models/Binder";

/**
 * @file src/db/models/TranslatedBinder.ts
 * @description Represents a binder with translated content extracted from properties.
 * This interface simplifies working with binders by providing direct access to
 * translated title and description for a specific language.
 */
export interface TranslatedBinder {
  id: string;
  author: string;
  image?: Blob;
  isFavorite: boolean;
  title: string;
  description: string;
  pictograms?: string[];
  users?: string[];
}

/**
 * Converts a Binder to a TranslatedBinder by extracting translations for the specified language
 */
export function translateBinder(binder: Binder, language: string): TranslatedBinder {
  const languageProps = binder.properties?.[language] || {};
  return {
    ...binder,
    title: languageProps.title || "",
    description: languageProps.description || "",
  };
}
