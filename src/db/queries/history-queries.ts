import { type PromiseExtended } from "dexie";

import { type History } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Create a new history record
 */
export function createHistory(this: PickNTalkDB, history: History) {
  return this.history.add(history);
}

/**
 * Get history records for a specific entity
 */
export function getHistory(this: PickNTalkDB, entityId: string): PromiseExtended<History[]> {
  return this.history.where({ entityId }).toArray();
}