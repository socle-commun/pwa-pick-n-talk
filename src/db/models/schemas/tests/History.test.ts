import { describe, it, expect } from "vitest";

import { validateHistory, validateHistorySafe, isValidHistory } from "../History";

describe("History Schema Validation", () => {
  const validHistory = {
    id: "history-123",
    entityType: "user" as const,
    entityId: "user-456",
    action: "update" as const,
    performedBy: "admin-789",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    changes: {
      "name": { "previous": "John", "current": "Johnny" },
      "email": { "previous": "john@old.com", "current": "john@new.com" }
    },
  };

  it("validates a correct history object", () => {
    expect(() => validateHistory(validHistory)).not.toThrow();
    expect(isValidHistory(validHistory)).toBe(true);
  });

  it("rejects history with empty id", () => {
    const invalidHistory = { ...validHistory, id: "" };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });

  it("rejects history with empty entityId", () => {
    const invalidHistory = { ...validHistory, entityId: "" };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });

  it("rejects history with empty performedBy", () => {
    const invalidHistory = { ...validHistory, performedBy: "" };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });

  it("accepts all valid entityType values", () => {
    const entityTypes = ["user", "binder", "pictogram", "category"] as const;
    entityTypes.forEach(entityType => {
      const historyWithEntityType = { ...validHistory, entityType };
      expect(() => validateHistory(historyWithEntityType)).not.toThrow();
      expect(isValidHistory(historyWithEntityType)).toBe(true);
    });
  });

  it("rejects invalid entityType", () => {
    const invalidHistory = { ...validHistory, entityType: "invalid" as unknown };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });

  it("accepts all valid action values", () => {
    const actions = ["create", "update", "delete", "access", "share", "import", "export"] as const;
    actions.forEach(action => {
      const historyWithAction = { ...validHistory, action };
      expect(() => validateHistory(historyWithAction)).not.toThrow();
      expect(isValidHistory(historyWithAction)).toBe(true);
    });
  });

  it("rejects invalid action", () => {
    const invalidHistory = { ...validHistory, action: "invalid" as unknown };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });

  it("validates history with complex changes", () => {
    const historyWithComplexChanges = {
      ...validHistory,
      changes: {
        "settings": {
          "theme": "dark",
          "language": "fr"
        },
        "metadata": {
          "lastLogin": "2024-01-15"
        }
      }
    };
    expect(() => validateHistory(historyWithComplexChanges)).not.toThrow();
  });

  it("validateHistorySafe returns success for valid data", () => {
    const result = validateHistorySafe(validHistory);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(expect.objectContaining({
        id: validHistory.id,
        entityType: validHistory.entityType,
        action: validHistory.action
      }));
    }
  });

  it("validateHistorySafe returns error for invalid data", () => {
    const invalidHistory = { ...validHistory, id: "" };
    const result = validateHistorySafe(invalidHistory);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toBe("validation.errors.field_empty");
    }
  });

  it("rejects history with invalid timestamp", () => {
    const invalidHistory = { ...validHistory, timestamp: "not-a-date" as unknown };
    expect(() => validateHistory(invalidHistory)).toThrow();
    expect(isValidHistory(invalidHistory)).toBe(false);
  });
});
