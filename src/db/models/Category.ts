/**
 * @file src/db/models/Category.ts
 * @description Represents a category in the database.
 * Categories are used to organize pictograms into logical groups,
 * making it easier for users to find and navigate content.
 */
export interface Category {
  id: string;

  image?: Blob;

  properties?: Record<string, Record<string, string>>;

  pictograms?: string[];
}
