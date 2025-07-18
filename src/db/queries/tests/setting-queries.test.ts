/**
 * Unit tests for setting-queries.ts
 */
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import { PickNTalkDB } from "../../index";
import type { Setting } from "../../models";

// Mock the populate function
vi.mock("../../populate", () => ({ populate: vi.fn() }));

describe("Setting Queries", () => {
  let db: PickNTalkDB;

  beforeEach(() => {
    db = new PickNTalkDB();
  });

  afterEach(async () => {
    await db.delete();
  });

  describe("getSettings", () => {
    it("should return all settings", async () => {
      const setting1: Setting = { 
        key: "theme", 
        value: "dark"
      };
      const setting2: Setting = { 
        key: "language", 
        value: "en"
      };

      await db.createSetting(setting1);
      await db.createSetting(setting2);

      const result = await db.getSettings();
      expect(result).toHaveLength(2);
      expect(result.find(s => s.key === "theme")).toBeDefined();
      expect(result.find(s => s.key === "language")).toBeDefined();
    });

    it("should return empty array when no settings exist", async () => {
      const result = await db.getSettings();
      expect(result).toEqual([]);
    });
  });

  describe("getSetting", () => {
    it("should return a setting by key", async () => {
      const setting: Setting = { 
        key: "theme", 
        value: "dark"
      };
      await db.createSetting(setting);

      const result = await db.getSetting("theme");
      expect(result).toBeDefined();
      expect(result?.key).toBe("theme");
      expect(result?.value).toBe("dark");
    });

    it("should return undefined for non-existent setting key", async () => {
      const result = await db.getSetting("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("createSetting", () => {
    it("should create a new setting and return the key", async () => {
      const setting: Setting = { 
        key: "theme", 
        value: "dark"
      };
      
      const result = await db.createSetting(setting);
      expect(result).toBe("theme");

      const stored = await db.getSetting("theme");
      expect(stored).toEqual(setting);
    });

    it("should reject creating a setting with duplicate key", async () => {
      const setting: Setting = { 
        key: "theme", 
        value: "dark"
      };
      await db.createSetting(setting);

      const duplicateSetting: Setting = { 
        key: "theme", 
        value: "light"
      };
      await expect(db.createSetting(duplicateSetting)).rejects.toThrow();
    });
  });
});