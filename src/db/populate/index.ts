import { db } from "@/db";

export async function populate() {
  console.info("Populate database with initial data...");

  // #region Binders
  await db.createBinder({
    id: crypto.randomUUID(),
    author: "Socle Commun",
    isFavorite: false,
    properties: {
      "fr-FR": {
        title: "Classeur général",
        description: "Un classeur général",
      },
      "en-US": {
        title: "General binder",
        description: "A general binder",
      },
    },
  });

  await db.createBinder({
    id: crypto.randomUUID(),
    author: "Socle Commun",
    isFavorite: false,
    properties: {
      "fr-FR": {
        title: "Classeur vide",
        description: "Un classeur vide",
      },
      "en-US": {
        title: "Empty binder",
        description: "An empty binder",
      },
    },
  });
  // #endregion

  console.info("Database populated.");
}
