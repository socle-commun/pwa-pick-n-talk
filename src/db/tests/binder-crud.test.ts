/**
 * Binder CRUD and edge case tests for PickNTalkDB
 */
import { vi, describe, it, expect, beforeAll, afterAll } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../index";

vi.mock("../populate", () => ({ populate: vi.fn() }));

let db: PickNTalkDB;
beforeAll(() => { db = new PickNTalkDB(); });
afterAll(async () => { await db.delete(); });

describe("Binder CRUD", () => {
  it("should perform CRUD operations for Binder", async () => {
    const binder = { id: "b1", author: "u1", isFavorite: false, pictograms: [], users: [] };
    await db.createBinder(binder);
    const fetched = await db.getBinder("b1");
    expect(fetched).toBeDefined();
    expect(fetched?.author).toBe("u1");
    const updated = { ...binder, isFavorite: true };
    await db.updateBinder(updated);
    const fetchedUpdated = await db.getBinder("b1");
    expect(fetchedUpdated?.isFavorite).toBe(true);
    await db.deleteBinder("b1");
    const deleted = await db.getBinder("b1");
    expect(deleted).toBeUndefined();
  });

  it("should reject creation of duplicate Binder ID", async () => {
    const binder = { id: "dup-binder", author: "u1", isFavorite: false, pictograms: [], users: [] };
    await db.createBinder(binder);
    // Try to create again with same ID
    await expect(db.createBinder(binder)).rejects.toThrow();
    await db.deleteBinder("dup-binder");
  });

  it("should not update non-existent Binder", async () => {
    const binder = { id: "missing", author: "none", isFavorite: false, pictograms: [], users: [] };
    await expect(db.updateBinder(binder)).resolves.toBeUndefined();
    const result = await db.getBinder("missing");
    expect(result).toBeUndefined();
  });
});
