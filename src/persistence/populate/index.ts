import { db } from "@/persistence";

interface ElementTranslation {
  language: string;
  key: string;
  value: string;
}

export async function populate() {
  console.info("Populated database with initial data...");

  // #region Binders
  await populateBinder([
    {
      language: "fr-FR",
      key: "title",
      value: "Classeur général"
    },
    {
      language: "en-US",
      key: "title",
      value: "General binder"
    },
    {
      language: "fr-FR",
      key: "description",
      value: "Un classeur général"
    },
    {
      language: "en-US",
      key: "description",
      value: "A general binder"
    }
  ]);

  await populateBinder([
    {
      language: "fr-FR",
      key: "title",
      value: "Classeur vide"
    },
    {
      language: "en-US",
      key: "title",
      value: "Empty binder"
    },
    {
      language: "fr-FR",
      key: "description",
      value: "Un classeur vide"
    },
    {
      language: "en-US",
      key: "description",
      value: "An empty binder"
    }
  ]);
  // #endregion

  console.info("Database populated.");
}


export async function populateBinder(translations: ElementTranslation[]) {
  const binderUuid = await db.createBinder({
    uuid: crypto.randomUUID(),
    author: "SimplePicto"
  });

  translations.forEach(async (translation) => {
    await db.createTranslation({
      objectUuid: binderUuid,
      language: translation.language,
      key: translation.key,
      value: translation.value
    });
  });

  return binderUuid;
}