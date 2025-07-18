/**
 * Unit tests for category-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Category } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("Category Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
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
        pictograms: ["pic1", "pic2"]
      };

      await db.createCategory(category1);
      await db.createCategory(category2);

      const result = await db.getCategories();
      expect(result).toHaveLength(2);
      expect(result.find(c => c.id === "cat1")).toBeDefined();
      expect(result.find(c => c.id === "cat2")).toBeDefined();
    });

    it("should return empty array when no categories exist", async () => {
      const result = await db.getCategories();
      expect(result).toEqual([]);
    });
  });

  describe("getCategory", () => {
    it("should return a category by ID", async () => {
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: ["pic1"]
      };
      await db.createCategory(category);

      const result = await db.getCategory("cat1");
      expect(result).toBeDefined();
      expect(result?.id).toBe("cat1");
      expect(result?.name).toBe("Animals");
      expect(result?.color).toBe("#FF0000");
    });

    it("should return undefined for non-existent category ID", async () => {
      const result = await db.getCategory("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("createCategory", () => {
    it("should create a new category and return the ID", async () => {
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      
      const result = await db.createCategory(category);
      expect(result).toBe("cat1");

      const stored = await db.getCategory("cat1");
      expect(stored).toEqual(category);
    });

    it("should reject creating a category with duplicate ID", async () => {
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      await db.createCategory(category);

      const duplicateCategory: Category = { 
        id: "cat1", 
        name: "Food", 
        color: "#00FF00",
        pictograms: ["pic1"]
      };
      await expect(db.createCategory(duplicateCategory)).rejects.toThrow();
    });
  });

  describe("updateCategory", () => {
    it("should update an existing category", async () => {
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      await db.createCategory(category);

      const updatedCategory: Category = { 
        id: "cat1", 
        name: "Updated Animals", 
        color: "#0000FF",
        pictograms: ["pic1", "pic2"]
      };
      await db.updateCategory(updatedCategory);

      const result = await db.getCategory("cat1");
      expect(result?.name).toBe("Updated Animals");
      expect(result?.color).toBe("#0000FF");
      expect(result?.pictograms).toEqual(["pic1", "pic2"]);
    });

    it("should handle updating non-existent category gracefully", async () => {
      const category: Category = { 
        id: "nonexistent", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      
      await expect(db.updateCategory(category)).resolves.not.toThrow();
    });
  });

  describe("deleteCategory", () => {
    it("should delete an existing category", async () => {
      const category: Category = { 
        id: "cat1", 
        name: "Animals", 
        color: "#FF0000",
        pictograms: []
      };
      await db.createCategory(category);

      await db.deleteCategory("cat1");

      const result = await db.getCategory("cat1");
      expect(result).toBeUndefined();
    });

    it("should handle deleting non-existent category gracefully", async () => {
      await expect(db.deleteCategory("nonexistent")).resolves.not.toThrow();
    });
  });
});