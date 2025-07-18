/**
 * Unit tests for pictogram-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Pictogram } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

// Helper function to create test pictogram
const createTestPictogram = (id: string, overrides: Partial<Pictogram> = {}): Pictogram => ({
  id,
  text: `Pictogram ${id}`,
  imageUrl: `${id}.png`,
  binder: "binder1",
  isFavorite: false,
  categories: [],
  ...overrides
});

describe("Pictogram Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  it("should handle all CRUD operations correctly", async () => {
    // Test create
    const pictogram = createTestPictogram("test", { text: "Dog", imageUrl: "dog.png" });
    const id = await db.createPictogram(pictogram);
    expect(id).toBe("test");
    await expect(db.createPictogram(pictogram)).rejects.toThrow(); // Duplicate

    // Test read via binder
    const stored = await db.getPictogramsFromBinderId("binder1");
    expect(stored).toHaveLength(1);
    expect(stored[0]).toEqual(pictogram);

    // Test update
    const updated = createTestPictogram("test", { text: "Updated Dog", isFavorite: true, categories: ["cat1"] });
    await db.updatePictogram(updated);
    const updatedStored = await db.getPictogramsFromBinderId("binder1");
    expect(updatedStored[0].text).toBe("Updated Dog");
    expect(updatedStored[0].isFavorite).toBe(true);
    expect(updatedStored[0].categories).toEqual(["cat1"]);

    // Test delete
    await db.deletePictogram("test");
    const afterDelete = await db.getPictogramsFromBinderId("binder1");
    expect(afterDelete).toEqual([]);

    // Test graceful handling of non-existent operations
    const nonExistent = createTestPictogram("none");
    await expect(db.updatePictogram(nonExistent)).resolves.not.toThrow();
    await expect(db.deletePictogram("none")).resolves.not.toThrow();
  });
});
