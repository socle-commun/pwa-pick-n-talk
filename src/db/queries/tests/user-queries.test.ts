/**
 * Unit tests for user-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { User } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("User Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getUser", () => {
    it("should return a user by ID", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };
      await db.createUser(user);

      const result = await db.getUser("user1");
      expect(result).toBeDefined();
      expect(result?.id).toBe("user1");
      expect(result?.email).toBe("test@example.com");
      expect(result?.name).toBe("Test User");
    });

    it("should return undefined for non-existent user ID", async () => {
      const result = await db.getUser("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("getUserByEmail", () => {
    it("should return a user by email", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };
      await db.createUser(user);

      const result = await db.getUserByEmail("test@example.com");
      expect(result).toBeDefined();
      expect(result?.id).toBe("user1");
      expect(result?.email).toBe("test@example.com");
    });

    it("should return undefined for non-existent email", async () => {
      const result = await db.getUserByEmail("nonexistent@example.com");
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user and return the ID", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };

      const result = await db.createUser(user);
      expect(result).toBe("user1");

      const stored = await db.getUser("user1");
      expect(stored).toEqual(user);
    });

    it("should reject creating a user with duplicate ID", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };
      await db.createUser(user);

      const duplicateUser: User = { id: "user1", email: "another@example.com", name: "Another User" };
      await expect(db.createUser(duplicateUser)).rejects.toThrow();
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };
      await db.createUser(user);

      const updatedUser: User = { id: "user1", email: "updated@example.com", name: "Updated User" };
      await db.updateUser(updatedUser);

      const result = await db.getUser("user1");
      expect(result?.email).toBe("updated@example.com");
      expect(result?.name).toBe("Updated User");
    });

    it("should handle updating non-existent user gracefully", async () => {
      const user: User = { id: "nonexistent", email: "test@example.com", name: "Test User" };

      // This should not throw, but the user won't be found for update
      await expect(db.updateUser(user)).resolves.not.toThrow();
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const user: User = { id: "user1", email: "test@example.com", name: "Test User" };
      await db.createUser(user);

      await db.deleteUser("user1");

      const result = await db.getUser("user1");
      expect(result).toBeUndefined();
    });

    it("should handle deleting non-existent user gracefully", async () => {
      await expect(db.deleteUser("nonexistent")).resolves.not.toThrow();
    });
  });
});
