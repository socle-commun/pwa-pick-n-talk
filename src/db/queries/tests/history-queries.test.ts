/**
 * Unit tests for history-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { History } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("History Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getHistory", () => {
    it("should return history entries for a specific entity", async () => {
      const history1: History = {
        id: "hist1",
        entityType: "Binder",
        entityId: "binder1",
        performedBy: "user1",
        timestamp: new Date("2024-01-01"),
        action: "create"
      };
      const history2: History = {
        id: "hist2",
        entityType: "Pictogram",
        entityId: "binder1",
        performedBy: "user2",
        timestamp: new Date("2024-01-02"),
        action: "update"
      };
      const history3: History = {
        id: "hist3",
        entityType: "Binder",
        entityId: "binder2",
        performedBy: "user1",
        timestamp: new Date("2024-01-03"),
        action: "delete"
      };

      await db.createHistory(history1);
      await db.createHistory(history2);
      await db.createHistory(history3);

      const result = await db.getHistory("binder1");
      expect(result).toHaveLength(2);
      expect(result.find(h => h.id === "hist1")).toBeDefined();
      expect(result.find(h => h.id === "hist2")).toBeDefined();
      expect(result.find(h => h.id === "hist3")).toBeUndefined();
    });

    it("should return empty array when no history entries exist for entity", async () => {
      const result = await db.getHistory("nonexistent");
      expect(result).toEqual([]);
    });
  });

  describe("createHistory", () => {
    it("should create a new history entry and return the ID", async () => {
      const history: History = {
        id: "hist1",
        entityType: "Binder",
        entityId: "binder1",
        performedBy: "user1",
        timestamp: new Date("2024-01-01"),
        action: "create"
      };

      const result = await db.createHistory(history);
      expect(result).toBe("hist1");

      const stored = await db.getHistory("binder1");
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(history);
    });

    it("should reject creating a history entry with duplicate ID", async () => {
      const history: History = {
        id: "hist1",
        entityType: "Binder",
        entityId: "binder1",
        performedBy: "user1",
        timestamp: new Date("2024-01-01"),
        action: "create"
      };
      await db.createHistory(history);

      const duplicateHistory: History = {
        id: "hist1",
        entityType: "Pictogram",
        entityId: "pic1",
        performedBy: "user2",
        timestamp: new Date("2024-01-02"),
        action: "update"
      };
      await expect(db.createHistory(duplicateHistory)).rejects.toThrow();
    });
  });
});
