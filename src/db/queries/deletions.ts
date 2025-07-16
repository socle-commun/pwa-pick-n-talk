import { type PickNTalkDB } from "../index";

export function deleteBinder(this: PickNTalkDB, binderId: string) {
  return this.transaction("rw", this.pictograms, this.binders, () => {
    this.pictograms.where({ binderUuid: binderId }).delete();
    this.binders.delete(binderId);
  });
}

export function deleteCategory(this: PickNTalkDB, id: string) {
  return this.transaction("rw", this.pictograms, this.categories, () => {
    // Remove category from all pictograms that reference it
    this.pictograms.toCollection().modify((pictogram) => {
      if (pictogram.categories) {
        pictogram.categories = pictogram.categories.filter(catId => catId !== id);
      }
    });
    this.categories.delete(id);
  });
}

export function deletePictogram(this: PickNTalkDB, id: string) {
  return this.pictograms.delete(id);
}

export function deleteUser(this: PickNTalkDB, id: string) {
  return this.users.delete(id);
}
