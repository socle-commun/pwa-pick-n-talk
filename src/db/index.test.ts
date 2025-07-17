
import { vi, describe, it, expect, beforeAll, afterAll } from "vitest";
// Inject fake-indexeddb before Dexie import
import "fake-indexeddb/auto";
import { PickNTalkDB } from "./index";

// Mock the populate function to avoid database setup issues in tests
vi.mock("./populate", () => ({
  populate: vi.fn(),
}));

let db: PickNTalkDB;
beforeAll(() => {
  db = new PickNTalkDB();
});
afterAll(async () => {
  await db.delete();
});


describe("PickNTalkDB", () => {
  it("should instantiate database class", () => {
    expect(db).toBeInstanceOf(PickNTalkDB);
    expect(db.name).toBe("pick-n-talk");
  });

  it("should have all required tables", () => {
    expect(db.binders).toBeDefined();
    expect(db.categories).toBeDefined();
    expect(db.pictograms).toBeDefined();
    expect(db.settings).toBeDefined();
    expect(db.users).toBeDefined();
    expect(db.history).toBeDefined();
  });

  it("should have all query methods", () => {
    expect(typeof db.getUser).toBe("function");
    expect(typeof db.getUserByEmail).toBe("function");
    expect(typeof db.getHistory).toBe("function");
    expect(typeof db.getBinders).toBe("function");
    expect(typeof db.getBinder).toBe("function");
    expect(typeof db.getPictogramsFromBinderId).toBe("function");
    expect(typeof db.getCategoriesFromBinderId).toBe("function");
  });

  it("should have all mutation methods", () => {
    expect(typeof db.createBinder).toBe("function");
    expect(typeof db.createCategory).toBe("function");
    expect(typeof db.createHistory).toBe("function");
    expect(typeof db.createPictogram).toBe("function");
    expect(typeof db.createSetting).toBe("function");
    expect(typeof db.createUser).toBe("function");
  });

  it("should have all update methods", () => {
    expect(typeof db.updateBinder).toBe("function");
    expect(typeof db.updatePictogram).toBe("function");
    expect(typeof db.updateCategory).toBe("function");
    expect(typeof db.updateUser).toBe("function");
  });

  it("should have all deletion methods", () => {
    expect(typeof db.deleteBinder).toBe("function");
    expect(typeof db.deleteCategory).toBe("function");
    expect(typeof db.deletePictogram).toBe("function");
    expect(typeof db.deleteUser).toBe("function");
  });

  // ...entity CRUD and edge case tests moved to src/db/tests/*
});
