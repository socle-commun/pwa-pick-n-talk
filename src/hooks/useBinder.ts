import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import { db } from "@/db";

export function useBinder(uuid: string | undefined) {
  const { i18n } = useTranslation();

  return useLiveQuery(async () => {
    if (!uuid) return null;
    try {
      return await db.getBinder(uuid);
    } catch (error) {
      console.error("Failed to load binder:", error);
      // Re-throw to let Error Boundary handle it
      throw error;
    }
  }, [uuid, i18n.language]);
}
