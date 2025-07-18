import { type PromiseExtended } from "dexie";

import { type Pictogram } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

/**
 * Get pictograms from a specific binder ID
 */
export function getPictogramsFromBinderId(
  this: PickNTalkDB,
  binderId: string
): PromiseExtended<Pictogram[]> {
  return this.pictograms.where({ binder: binderId }).toArray();
}

/**
 * Create a new pictogram
 */
export function createPictogram(this: PickNTalkDB, pictogram: Pictogram): PromiseExtended<string> {
  return this.pictograms.add(pictogram);
}

/**
 * Update an existing pictogram
 */
export function updatePictogram(
  this: PickNTalkDB,
  pictogram: Pictogram
): PromiseExtended<void> {
  return this.pictograms.update(pictogram.id, pictogram).then(() => {});
}

/**
 * Delete a pictogram
 */
export function deletePictogram(this: PickNTalkDB, id: string): PromiseExtended<void> {
  return this.pictograms.delete(id);
}
