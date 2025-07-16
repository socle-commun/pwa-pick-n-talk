/**
 * @file src/db/models/Pictogram.ts
 * @description Represents a pictogram in the database.
 * Pictograms are the core visual elements used for communication,
 * containing images, sounds, and organizational metadata.
 */
export interface Pictogram {
  id: string;

  image?: Blob;
  sound?: Blob;
  isFavorite: boolean;
  order: number;

  properties?: Record<string, Record<string, string>>;

  binder: string;
  categories?: string[];
}
