/**
 * Category CRUD and edge case tests for PickNTalkDB
 */
import { vi, describe, it, expect, beforeAll, afterAll } from "vitest";

import "fake-indexeddb/auto";
import { PickNTalkDB } from "../index";

vi.mock("../populate", () => ({ populate: vi.fn() }));

let db: PickNTalkDB;
beforeAll(() => { db = new PickNTalkDB(); });
afterAll(async () => { await db.delete(); });

describe("Category CRUD", () => {
  it("should perform CRUD operations for Category", async () => {
    const category = { id: "c1", pictograms: [] };
    await db.createCategory(category);
    const fetched = await db.categories.get("c1");
    expect(fetched).toBeDefined();
    const updated = { ...category, pictograms: ["p1"] };
    await db.updateCategory(updated);
    const fetchedUpdated = await db.categories.get("c1");
    expect(fetchedUpdated?.pictograms).toContain("p1");
    await db.deleteCategory("c1");
    const deleted = await db.categories.get("c1");
    expect(deleted).toBeUndefined();
  });

  it("should reject creation of duplicate Category ID", async () => {
    const category = { id: "dup-cat", pictograms: [] };
    await db.createCategory(category);
    // Try to create again with same ID
    await expect(db.createCategory(category)).rejects.toThrow();
    await db.deleteCategory("dup-cat");
  });
});
