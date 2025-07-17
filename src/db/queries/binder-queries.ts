import { type PromiseExtended } from "dexie";

import { type Binder } from "@/db/models";

import { type PickNTalkDB } from "@/db/index";

export function getBinders(this: PickNTalkDB): PromiseExtended<Binder[]> {
  return this.binders.toArray();
}

export function getBinder(this: PickNTalkDB, id: string): PromiseExtended<Binder | undefined> {
  return this.binders.get(id);
}
