import { type Pictogram } from "@/db/models/Pictogram";

/**
 * @file src/db/models/TranslatedPictogram.ts
 * @description Represents a pictogram with translated content extracted from properties.
 * This interface simplifies working with pictograms by providing direct access to
 * translated word for a specific language.
 */
export interface TranslatedPictogram {
  id: string;
  image?: Blob;
  sound?: Blob;
  isFavorite: boolean;
  word: string;
  binderUuid: string;
  categories?: string[];
}

/**
 * Converts a Pictogram to a TranslatedPictogram by extracting translations for the specified language
 */
export function translatePictogram(pictogram: Pictogram, language: string): TranslatedPictogram {
  const languageProps = pictogram.properties?.[language] || {};
  return {
    ...pictogram,
    word: languageProps.word || "",
  };
}
