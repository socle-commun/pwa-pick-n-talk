import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

export function useIsEmptyDatabase() {
  return useLiveQuery(
    async () => {
      try {
        return await db.isEmpty();
      } catch (error) {
        console.error("Failed to check if database is empty:", error);
        // In case of error, assume database is not empty to avoid incorrect redirects
        return false;
      }
    },
    [db]
  );
}