/**
 * Unit tests for binder-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Binder } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("Binder Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getBinders", () => {
    it("should return all binders", async () => {
      const binder1: Binder = { 
        id: "binder1", 
        title: "Binder 1", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      const binder2: Binder = { 
        id: "binder2", 
        title: "Binder 2", 
        author: "user1",
        isFavorite: true,
        pictograms: [],
        users: []
      };

      await db.createBinder(binder1);
      await db.createBinder(binder2);

      const result = await db.getBinders();
      expect(result).toHaveLength(2);
      expect(result.find(b => b.id === "binder1")).toBeDefined();
      expect(result.find(b => b.id === "binder2")).toBeDefined();
    });

    it("should return empty array when no binders exist", async () => {
      const result = await db.getBinders();
      expect(result).toEqual([]);
    });
  });

  describe("getBinder", () => {
    it("should return a binder by ID", async () => {
      const binder: Binder = { 
        id: "binder1", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      await db.createBinder(binder);

      const result = await db.getBinder("binder1");
      expect(result).toBeDefined();
      expect(result?.id).toBe("binder1");
      expect(result?.title).toBe("Test Binder");
    });

    it("should return undefined for non-existent binder ID", async () => {
      const result = await db.getBinder("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("createBinder", () => {
    it("should create a new binder and return the ID", async () => {
      const binder: Binder = { 
        id: "binder1", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      
      const result = await db.createBinder(binder);
      expect(result).toBe("binder1");

      const stored = await db.getBinder("binder1");
      expect(stored).toEqual(binder);
    });

    it("should reject creating a binder with duplicate ID", async () => {
      const binder: Binder = { 
        id: "binder1", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      await db.createBinder(binder);

      const duplicateBinder: Binder = { 
        id: "binder1", 
        title: "Another Binder", 
        author: "user2",
        isFavorite: true,
        pictograms: [],
        users: []
      };
      await expect(db.createBinder(duplicateBinder)).rejects.toThrow();
    });
  });

  describe("updateBinder", () => {
    it("should update an existing binder", async () => {
      const binder: Binder = { 
        id: "binder1", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      await db.createBinder(binder);

      const updatedBinder: Binder = { 
        id: "binder1", 
        title: "Updated Binder", 
        author: "user1",
        isFavorite: true,
        pictograms: ["pic1"],
        users: ["user2"]
      };
      await db.updateBinder(updatedBinder);

      const result = await db.getBinder("binder1");
      expect(result?.title).toBe("Updated Binder");
      expect(result?.isFavorite).toBe(true);
      expect(result?.pictograms).toEqual(["pic1"]);
    });

    it("should handle updating non-existent binder gracefully", async () => {
      const binder: Binder = { 
        id: "nonexistent", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      
      await expect(db.updateBinder(binder)).resolves.not.toThrow();
    });
  });

  describe("deleteBinder", () => {
    it("should delete an existing binder", async () => {
      const binder: Binder = { 
        id: "binder1", 
        title: "Test Binder", 
        author: "user1",
        isFavorite: false,
        pictograms: [],
        users: []
      };
      await db.createBinder(binder);

      await db.deleteBinder("binder1");

      const result = await db.getBinder("binder1");
      expect(result).toBeUndefined();
    });

    it("should handle deleting non-existent binder gracefully", async () => {
      await expect(db.deleteBinder("nonexistent")).resolves.not.toThrow();
    });
  });
});