/**
 * Unit tests for pictogram-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Pictogram } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("Pictogram Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getPictogramsFromBinderId", () => {
    it("should return pictograms for a specific binder", async () => {
      const pictogram1: Pictogram = { 
        id: "pic1", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      const pictogram2: Pictogram = { 
        id: "pic2", 
        text: "World", 
        imageUrl: "world.png",
        binder: "binder1",
        isFavorite: true,
        categories: ["cat1"]
      };
      const pictogram3: Pictogram = { 
        id: "pic3", 
        text: "Other", 
        imageUrl: "other.png",
        binder: "binder2",
        isFavorite: false,
        categories: []
      };

      await db.createPictogram(pictogram1);
      await db.createPictogram(pictogram2);
      await db.createPictogram(pictogram3);

      const result = await db.getPictogramsFromBinderId("binder1");
      expect(result).toHaveLength(2);
      expect(result.find(p => p.id === "pic1")).toBeDefined();
      expect(result.find(p => p.id === "pic2")).toBeDefined();
      expect(result.find(p => p.id === "pic3")).toBeUndefined();
    });

    it("should return empty array when no pictograms exist for binder", async () => {
      const result = await db.getPictogramsFromBinderId("nonexistent");
      expect(result).toEqual([]);
    });
  });

  describe("createPictogram", () => {
    it("should create a new pictogram and return the ID", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      
      const result = await db.createPictogram(pictogram);
      expect(result).toBe("pic1");

      // Verify by getting all pictograms from the binder
      const stored = await db.getPictogramsFromBinderId("binder1");
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(pictogram);
    });

    it("should reject creating a pictogram with duplicate ID", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      await db.createPictogram(pictogram);

      const duplicatePictogram: Pictogram = { 
        id: "pic1", 
        text: "World", 
        imageUrl: "world.png",
        binder: "binder2",
        isFavorite: true,
        categories: ["cat1"]
      };
      await expect(db.createPictogram(duplicatePictogram)).rejects.toThrow();
    });
  });

  describe("updatePictogram", () => {
    it("should update an existing pictogram", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      await db.createPictogram(pictogram);

      const updatedPictogram: Pictogram = { 
        id: "pic1", 
        text: "Updated Hello", 
        imageUrl: "updated-hello.png",
        binder: "binder1",
        isFavorite: true,
        categories: ["cat1", "cat2"]
      };
      await db.updatePictogram(updatedPictogram);

      const result = await db.getPictogramsFromBinderId("binder1");
      expect(result[0].text).toBe("Updated Hello");
      expect(result[0].imageUrl).toBe("updated-hello.png");
      expect(result[0].isFavorite).toBe(true);
      expect(result[0].categories).toEqual(["cat1", "cat2"]);
    });

    it("should handle updating non-existent pictogram gracefully", async () => {
      const pictogram: Pictogram = { 
        id: "nonexistent", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      
      await expect(db.updatePictogram(pictogram)).resolves.not.toThrow();
    });
  });

  describe("deletePictogram", () => {
    it("should delete an existing pictogram", async () => {
      const pictogram: Pictogram = { 
        id: "pic1", 
        text: "Hello", 
        imageUrl: "hello.png",
        binder: "binder1",
        isFavorite: false,
        categories: []
      };
      await db.createPictogram(pictogram);

      await db.deletePictogram("pic1");

      const result = await db.getPictogramsFromBinderId("binder1");
      expect(result).toHaveLength(0);
    });

    it("should handle deleting non-existent pictogram gracefully", async () => {
      await expect(db.deletePictogram("nonexistent")).resolves.not.toThrow();
    });
  });
});