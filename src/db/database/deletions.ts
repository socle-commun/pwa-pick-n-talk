import { type PickNTalkDB } from "../index";

export function deleteBinder(this: PickNTalkDB, binderUuid: string) {
  return this.transaction("rw", this.pictograms, this.binders, () => {
    this.pictograms.where({ binderUuid }).delete();
    this.binders.delete(binderUuid);
  });
}

export function deleteCategory(this: PickNTalkDB, uuid: string) {
  return this.transaction("rw", this.pictograms, this.categories, () => {
    // Remove category from all pictograms that reference it
    this.pictograms.toCollection().modify((pictogram) => {
      if (pictogram.categories) {
        pictogram.categories = pictogram.categories.filter(catId => catId !== uuid);
      }
    });
    this.categories.delete(uuid);
  });
}

export function deletePictogram(this: PickNTalkDB, uuid: string) {
  this.pictograms.delete(uuid);
}

export function deleteUser(this: PickNTalkDB, uuid: string) {
  this.users.delete(uuid);
}
