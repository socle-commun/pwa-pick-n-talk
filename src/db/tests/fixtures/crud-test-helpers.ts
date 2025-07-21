import { db } from "@/db";

/**
 * Common test setup for database CRUD tests
 */
export const setupTestDatabase = async () => {
  await db.delete();
  await db.open();
};

/**
 * Common teardown for database tests
 */
export const teardownTestDatabase = async () => {
  await db.delete();
};
