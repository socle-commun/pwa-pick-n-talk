// import { db } from "@/db";

export async function populate() {
  console.info("Populate database with initial data...");

  // #region Binders
  // await db.createBinder({
  //   id: crypto.randomUUID(),
  //   author: "Socle Commun",
  //   isFavorite: false,
  //   properties: {
  //     "fr": {
  //       title: "Classeur général",
  //       description: "Un classeur général",
  //     },
  //     "en": {
  //       title: "General binder",
  //       description: "A general binder",
  //     },
  //     "es": {
  //       title: "Carpeta general",
  //       description: "Una carpeta general",
  //     },
  //   },
  // });

  // await db.createBinder({
  //   id: crypto.randomUUID(),
  //   author: "Socle Commun",
  //   isFavorite: false,
  //   properties: {
  //     "fr": {
  //       title: "Classeur vide",
  //       description: "Un classeur vide",
  //     },
  //     "en": {
  //       title: "Empty binder",
  //       description: "An empty binder",
  //     },
  //     "es": {
  //       title: "Carpeta vacía",
  //       description: "Una carpeta vacía",
  //     },
  //   },
  // });
  // #endregion

  console.info("Database populated.");
}
