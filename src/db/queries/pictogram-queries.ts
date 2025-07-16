import { type PromiseExtended } from "dexie";

import { type Category } from "@/db/models/Category";
import { type Pictogram } from "@/db/models/Pictogram";

import { type PickNTalkDB } from "../index";

export function getPictogramsFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string
): PromiseExtended<Pictogram[]> {
  return this.pictograms.where({ binderUuid }).toArray();
}

export function getCategoriesFromBinderUuid(
  this: PickNTalkDB,
  binderUuid: string
): PromiseExtended<Category[]> {
  return this.transaction("r", this.pictograms, this.categories, () => {
    return this.getPictogramsFromBinderUuid(binderUuid).then((pictograms) => {
      const categoryIds = new Set<string>();
      pictograms.forEach((pictogram) => {
        if (pictogram.categories) {
          pictogram.categories.forEach((categoryId) => {
            categoryIds.add(categoryId);
          });
        }
      });
      return this.categories
        .where("id")
        .anyOf(Array.from(categoryIds))
        .toArray();
    });
  });
}