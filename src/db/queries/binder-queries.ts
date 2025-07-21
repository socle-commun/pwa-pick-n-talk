import { type PromiseExtended } from "dexie";

import { type PickNTalkDB } from "@/db/index";
import { type Binder } from "@/db/models";


/**
 * Get all binders
 */
export function getBinders(this: PickNTalkDB): PromiseExtended<Binder[]> {
  return this.binders.toArray();
}

/**
 * Get a binder by ID
 */
export function getBinder(this: PickNTalkDB, id: string): PromiseExtended<Binder | undefined> {
  return this.binders.get(id);
}

/**
 * Create a new binder
 */
export function createBinder(this: PickNTalkDB, binder: Binder): PromiseExtended<string> {
  return this.binders.add(binder);
}

/**
 * Update an existing binder
 */
export function updateBinder(
  this: PickNTalkDB,
  binder: Binder
): PromiseExtended<void> {
  return this.binders.update(binder.id, binder).then(() => {});
}

/**
 * Delete a binder and all its associated pictograms
 */
export function deleteBinder(this: PickNTalkDB, binderId: string): PromiseExtended<void> {
  return this.transaction("rw", this.pictograms, this.binders, async () => {
    await this.pictograms.where({ binder: binderId }).delete();
    await this.binders.delete(binderId);
  });
}
