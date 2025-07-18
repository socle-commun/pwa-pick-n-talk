/**
 * Unit tests for binder-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Binder } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

// Helper function to create test binder
const createTestBinder = (id: string, overrides: Partial<Binder> = {}): Binder => ({
  id,
  title: `Binder ${id}`,
  author: "user1",
  isFavorite: false,
  pictograms: [],
  users: [],
  ...overrides
});

describe("Binder Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  it("should handle all CRUD operations correctly", async () => {
    // Test empty state
    expect(await db.getBinders()).toEqual([]);
    expect(await db.getBinder("nonexistent")).toBeUndefined();

    // Test create
    const binder = createTestBinder("test", { title: "Test Binder" });
    const id = await db.createBinder(binder);
    expect(id).toBe("test");
    await expect(db.createBinder(binder)).rejects.toThrow(); // Duplicate

    // Test read
    const stored = await db.getBinder("test");
    expect(stored).toEqual(binder);
    expect(await db.getBinders()).toHaveLength(1);

    // Test update
    const updated = createTestBinder("test", { title: "Updated", isFavorite: true });
    await db.updateBinder(updated);
    const result = await db.getBinder("test");
    expect(result?.title).toBe("Updated");
    expect(result?.isFavorite).toBe(true);

    // Test delete
    await db.deleteBinder("test");
    expect(await db.getBinder("test")).toBeUndefined();
    expect(await db.getBinders()).toEqual([]);

    // Test graceful handling of non-existent operations
    const nonExistent = createTestBinder("none");
    await expect(db.updateBinder(nonExistent)).resolves.not.toThrow();
    await expect(db.deleteBinder("none")).resolves.not.toThrow();
  });
});
