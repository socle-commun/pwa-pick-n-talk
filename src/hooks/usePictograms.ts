import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";
import { db } from "@/db";

export function usePictograms(binderId: string) {
  const { i18n } = useTranslation();

  return useLiveQuery(async () => {
    if (!binderId) {
      throw new Error("Binder ID is required");
    }

    try {
      return await db.getPictogramsFromBinderId(binderId);
    } catch (error) {
      console.error("Failed to load pictograms:", error);
      // Re-throw to let Error Boundary handle it
      throw error;
    }
  }, [binderId, i18n.language]);
}
