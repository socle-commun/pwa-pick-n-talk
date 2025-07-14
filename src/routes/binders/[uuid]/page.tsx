import { useParams } from "react-router";
import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import PictogramsGrid from "@/components/partials/pictograms/PictogramsGrid";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { db } from "@/db";
import cn from "@/utils/cn";

export default function BinderPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const { i18n } = useTranslation();

  const binder = useLiveQuery(async () => {
    if (!uuid) return null;
    try {
      return await db.getTranslatedBinder(uuid, i18n.language);
    } catch (error) {
      console.error("Failed to load binder:", error);
      // Re-throw to let Error Boundary handle it
      throw error;
    }
  }, [uuid, i18n.language]);

  if (!uuid) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-red-600 dark:text-red-400")}>
          Invalid binder ID
        </div>
      </div>
    );
  }

  return (
    <DatabaseErrorBoundary
      fallback={
        <div className={cn("flex flex-col items-center justify-center p-8")}>
          <div className={cn("text-red-600 dark:text-red-400 text-xl mb-2")}>
            ⚠️ Failed to load binder
          </div>
          <div className={cn("text-zinc-600 dark:text-zinc-400 text-center")}>
            There was an error loading this binder.
            <br />
            Please try refreshing the page.
          </div>
        </div>
      }
    >
      <BinderContent binder={binder} uuid={uuid} />
    </DatabaseErrorBoundary>
  );
}

interface BinderContentProps {
  binder: any;
  uuid: string;
}

function BinderContent({ binder, uuid }: BinderContentProps) {
  if (binder === undefined) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-zinc-600 dark:text-zinc-400 flex items-center gap-2")}>
          <div 
            className={cn("animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full")} 
            role="status"
            aria-hidden="true"
          />
          Loading binder...
        </div>
      </div>
    );
  }

  if (!binder) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-red-600 dark:text-red-400")}>
          Binder not found
        </div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-full")}>
      {/* Binder Header */}
      <div
        className={cn(
          "bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-6"
        )}
      >
        <h1
          className={cn("text-3xl font-bold text-zinc-900 dark:text-zinc-100")}
        >
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
