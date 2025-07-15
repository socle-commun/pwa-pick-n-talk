import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";
import { db } from "@/db";

export function usePictograms(binderUuid: string) {
  const { i18n } = useTranslation();

  return useLiveQuery(async () => {
    if (!binderUuid) {
      throw new Error("Binder UUID is required");
    }

    try {
      return await db.getTranslatedPictogramsFromBinderUuid(
        binderUuid,
        i18n.language
      );
    } catch (error) {
      console.error("Failed to load pictograms:", error);
      // Re-throw to let Error Boundary handle it
      throw error;
    }
  }, [binderUuid, i18n.language]);
}
