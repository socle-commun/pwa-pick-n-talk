/**
 * @file src/db/models/Binder.ts
 * @description Represents a binder in the database.
 * A binder is a collection of pictograms that can be organized and shared between users.
 * It contains metadata, visual representation, and relationships to pictograms and users.
 */
export interface Binder {
  id: string;

  author: string;
  image?: Blob;
  isFavorite: boolean;

  properties?: Record<string, Record<string, string>>;

  pictograms?: string[];
  users?: string[];
}
