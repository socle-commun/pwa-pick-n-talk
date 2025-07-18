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

  it("should handle all global operations correctly", async () => {
    // Setup test data
    const category: Category = { id: "cat1", name: "Animals", color: "#FF0000", pictograms: ["pic1"] };
    const pictogram: Pictogram = { id: "pic1", text: "Dog", imageUrl: "dog.png", binder: "binder1", isFavorite: false, categories: ["cat1"] };

    await db.createCategory(category);
    await db.createPictogram(pictogram);

    // Test cross-domain operations
    const pictograms = await db.getPictogramsFromBinderId("binder1");
    expect(pictograms).toHaveLength(1);

    const categoriesFromPictograms = await db.getCategoriesFromPictograms(pictograms);
    expect(categoriesFromPictograms).toHaveLength(1);
    expect(categoriesFromPictograms[0].id).toBe("cat1");

    const categoriesFromBinder = await db.getCategoriesFromBinderId("binder1");
    expect(categoriesFromBinder).toHaveLength(1);
    expect(categoriesFromBinder[0].id).toBe("cat1");

    // Test empty states
    expect(await db.getPictogramsFromBinderId("nonexistent")).toEqual([]);
    expect(await db.getCategoriesFromBinderId("nonexistent")).toEqual([]);
    expect(await db.getCategoriesFromPictograms([])).toEqual([]);
  });
});
