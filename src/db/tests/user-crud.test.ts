/**
 * User CRUD and edge case tests for PickNTalkDB
 */
import { vi, describe, it, expect, beforeAll, afterAll } from "vitest";

import "fake-indexeddb/auto";
import { PickNTalkDB } from "../index";

vi.mock("../populate", () => ({ populate: vi.fn() }));

let db: PickNTalkDB;
beforeAll(() => { db = new PickNTalkDB(); });
afterAll(async () => { await db.delete(); });

describe("User CRUD", () => {
  it("should perform CRUD operations for User", async () => {
    const user = { id: "u1", email: "test@example.com", name: "Test User" };
    await db.createUser(user);
    const fetched = await db.getUser("u1");
    expect(fetched).toBeDefined();
    expect(fetched?.email).toBe("test@example.com");
    const updated = { ...user, name: "Updated User" };
    await db.updateUser(updated);
    const fetchedUpdated = await db.getUser("u1");
    expect(fetchedUpdated?.name).toBe("Updated User");
    await db.deleteUser("u1");
    const deleted = await db.getUser("u1");
    expect(deleted).toBeUndefined();
  });

  it("should not create duplicate User IDs", async () => {
    const user = { id: "dup", email: "dup@example.com", name: "Dup" };
    await db.createUser(user);
    await expect(db.createUser(user)).rejects.toThrow();
    await db.deleteUser("dup");
  });

  it("should return undefined for non-existent User", async () => {
    const result = await db.getUser("notfound");
    expect(result).toBeUndefined();
  });
});
