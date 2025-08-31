/**
 * Unit tests for category-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Category } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

// Helper function to create test category
const createTestCategory = (id: string, overrides: Partial<Category> = {}): Category => ({
  id,
  name: `Category ${id}`,
  color: "#FF0000",
  pictograms: [],
  ...overrides
});

describe("Category Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  it("should handle all CRUD operations correctly", async () => {
    await testEmptyState();
    await testCreateOperations();
    await testReadOperations();
    await testUpdateOperations();
    await testDeleteOperations();
    await testNonExistentOperations();
  });

  async function testEmptyState() {
    expect(await db.getCategories()).toEqual([]);
    expect(await db.getCategory("nonexistent")).toBeUndefined();
  }

  async function testCreateOperations() {
    const category = createTestCategory("test", { name: "Animals", color: "#00FF00" });
    const id = await db.createCategory(category);
    expect(id).toBe("test");
    await expect(db.createCategory(category)).rejects.toThrow(); // Duplicate
  }

  async function testReadOperations() {
    const category = createTestCategory("test", { name: "Animals", color: "#00FF00" });
    const stored = await db.getCategory("test");
    expect(stored).toEqual(category);
    expect(await db.getCategories()).toHaveLength(1);
  }

  async function testUpdateOperations() {
    const updated = createTestCategory("test", { name: "Updated Animals", color: "#0000FF", pictograms: ["pic1"] });
    await db.updateCategory(updated);
    const result = await db.getCategory("test");
    expect(result?.name).toBe("Updated Animals");
    expect(result?.color).toBe("#0000FF");
    expect(result?.pictograms).toEqual(["pic1"]);
  }

  async function testDeleteOperations() {
    await db.deleteCategory("test");
    expect(await db.getCategory("test")).toBeUndefined();
    expect(await db.getCategories()).toEqual([]);
  }

  async function testNonExistentOperations() {
    const nonExistent = createTestCategory("none");
    await expect(db.updateCategory(nonExistent)).resolves.not.toThrow();
    await expect(db.deleteCategory("none")).resolves.not.toThrow();
  }
});


