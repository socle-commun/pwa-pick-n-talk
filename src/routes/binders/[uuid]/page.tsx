import { useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import PictogramsGrid from "@/components/partials/pictograms/PictogramsGrid";
import { db } from "@/db";
import cn from "@/utils/cn";

export default function BinderPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const { i18n } = useTranslation();

  const binder = useLiveQuery(
    async () => {
      if (!uuid) return null;
      try {
        return await db.getTranslatedBinder(uuid, i18n.language);
      } catch (error) {
        console.error("Failed to load binder:", error);
        return null;
      }
    },
    [uuid, i18n.language]
  );

  if (!uuid) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-red-600 dark:text-red-400")}>
          Invalid binder ID
        </div>
      </div>
    );
  }

  if (!binder) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-zinc-600 dark:text-zinc-400")}>
          Loading binder...
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-full")}>
      {/* Binder Header */}
      <div className={cn("bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-6")}>
        <h1 className={cn("text-3xl font-bold text-zinc-900 dark:text-zinc-100")}>
          {binder.title}
        </h1>
        {binder.description && (
          <p className={cn("mt-2 text-zinc-600 dark:text-zinc-400")}>
            {binder.description}
          </p>
        )}
      </div>

      {/* Pictograms Grid */}
      <PictogramsGrid binderUuid={uuid} />
    </div>
  );
}