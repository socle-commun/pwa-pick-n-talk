/**
 * Unit tests for global-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Category, Pictogram } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("Global Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getCategoriesFromPictograms", () => {
    it("should return categories associated with pictograms", async () => {
      // Create categories
      const category1: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      const category2: Category = { 
        id: "cat2", 
        name: "Food", 
        color: "#00FF00",
        pictograms: []
      };
      const category3: Category = { 
        id: "cat3", 
        name: "Actions", 
        color: "#0000FF",
        pictograms: []
      };

      await db.createCategory(category1);
      await db.createCategory(category2);
      await db.createCategory(category3);

      // Create pictograms with category associations
      const pictogram1: Pictogram = { 
        id: "pic1", 
        text: "Dog", 
        imageUrl: "dog.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["cat1"] // Animals
      };
      const pictogram2: Pictogram = { 
        id: "pic2", 
        text: "Apple", 
        imageUrl: "apple.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["cat2"] // Food
      };
      const pictogram3: Pictogram = { 
        id: "pic3", 
        text: "Eating Animal", 
        imageUrl: "eating.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["cat1", "cat2"] // Both Animals and Food
      };

      await db.createPictogram(pictogram1);
      await db.createPictogram(pictogram2);
      await db.createPictogram(pictogram3);

      // Test with pictograms that have categories
      const pictograms = [pictogram1, pictogram2, pictogram3];
      const result = await db.getCategoriesFromPictograms(pictograms);

      expect(result).toHaveLength(2);
      expect(result.find(c => c.id === "cat1")).toBeDefined();
      expect(result.find(c => c.id === "cat2")).toBeDefined();
      expect(result.find(c => c.id === "cat3")).toBeUndefined(); // Not associated with any pictogram
    });

    it("should return empty array when pictograms have no categories", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Uncategorized", 
        imageUrl: "uncategorized.png",
        binder: "binder1",
        isFavorite: false,
        categories: [] // No categories
      };

      const result = await db.getCategoriesFromPictograms([pictogram]);
      expect(result).toEqual([]);
    });

    it("should return empty array when no pictograms provided", async () => {
      const result = await db.getCategoriesFromPictograms([]);
      expect(result).toEqual([]);
    });

    it("should handle pictograms with undefined categories", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "No Categories", 
        imageUrl: "no-categories.png",
        binder: "binder1",
        isFavorite: false,
        categories: undefined as any // Undefined categories
      };

      const result = await db.getCategoriesFromPictograms([pictogram]);
      expect(result).toEqual([]);
    });

    it("should deduplicate categories when multiple pictograms reference the same category", async () => {
      // Create category
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      await db.createCategory(category);

      // Create multiple pictograms with the same category
      const pictogram1: Pictogram = { 
        id: "pic1", 
        text: "Dog", 
        imageUrl: "dog.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["cat1"]
      };
      const pictogram2: Pictogram = { 
        id: "pic2", 
        text: "Cat", 
        imageUrl: "cat.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["cat1"]
      };

      await db.createPictogram(pictogram1);
      await db.createPictogram(pictogram2);

      const result = await db.getCategoriesFromPictograms([pictogram1, pictogram2]);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("cat1");
    });

    it("should handle non-existent category IDs gracefully", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Test", 
        imageUrl: "test.png",
        binder: "binder1",
        isFavorite: false,
        categories: ["nonexistent-category"]
      };

      const result = await db.getCategoriesFromPictograms([pictogram]);
      expect(result).toEqual([]);
    });
  });
});