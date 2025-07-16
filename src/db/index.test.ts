import { describe, test, expect } from "vitest";
import { PickNTalkDB, db } from "./index";

// Mock the populate function to avoid database setup issues in tests
vi.mock("./populate", () => ({
  populate: vi.fn(),
}));

describe("PickNTalkDB", () => {
  test("should instantiate database class", () => {
    expect(db).toBeInstanceOf(PickNTalkDB);
    expect(db.name).toBe("pick-n-talk");
  });

  test("should have all required tables", () => {
    expect(db.binders).toBeDefined();
    expect(db.categories).toBeDefined();
    expect(db.pictograms).toBeDefined();
    expect(db.settings).toBeDefined();
    expect(db.users).toBeDefined();
    expect(db.history).toBeDefined();
  });

  test("should have all query methods", () => {
    expect(typeof db.getUser).toBe("function");
    expect(typeof db.getUserByEmail).toBe("function");
    expect(typeof db.getHistory).toBe("function");
    expect(typeof db.getBinders).toBe("function");
    expect(typeof db.getBinder).toBe("function");
    expect(typeof db.getPictogramsFromBinderId).toBe("function");
    expect(typeof db.getCategoriesFromBinderId).toBe("function");
  });

  test("should have all mutation methods", () => {
    expect(typeof db.createBinder).toBe("function");
    expect(typeof db.createCategory).toBe("function");
    expect(typeof db.createHistory).toBe("function");
    expect(typeof db.createPictogram).toBe("function");
    expect(typeof db.createSetting).toBe("function");
    expect(typeof db.createUser).toBe("function");
  });

  test("should have all update methods", () => {
    expect(typeof db.updateBinder).toBe("function");
    expect(typeof db.updatePictogram).toBe("function");
    expect(typeof db.updateCategory).toBe("function");
  });

  test("should have all deletion methods", () => {
    expect(typeof db.deleteBinder).toBe("function");
    expect(typeof db.deleteCategory).toBe("function");
    expect(typeof db.deletePictogram).toBe("function");
    expect(typeof db.deleteUser).toBe("function");
  });
});
