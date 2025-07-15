import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";
import { db } from "@/db";

export function useBinders() {
  const { i18n } = useTranslation();

  return useLiveQuery(
    async () => {
      try {
        return await db.getTranslatedBinders(i18n.language);
      } catch (error) {
        console.error("Failed to load binders:", error);
        // Re-throw to let Error Boundary handle it
        throw error;
      }
    },
    [db, i18n.language]
  );
}
