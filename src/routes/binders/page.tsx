import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import BinderCard from "@/components/partials/binders/BinderCard";
import EmptyBindersList from "@/components/partials/binders/EmptyBindersList";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";

import { db } from "@/db";

import cn from "@/utils/cn";

export default function IndexPage() {
  const { t, i18n } = useTranslation();

  const binders = useLiveQuery(
    async () => {
      try {
        return await db.getTranslatedBinders(i18n.language);
      } catch (error) {
        console.error("Failed to load binders:", error);
        // Re-throw to let Error Boundary handle it
        throw error;
      }
    },
    [db, t, i18n.language]
  );

  return (
    <DatabaseErrorBoundary
      fallback={
        <div className={cn("flex flex-col items-center justify-center p-8")}>
          <div className={cn("text-red-600 dark:text-red-400 text-xl mb-2")}>
            ⚠️ Failed to load binders
          </div>
          <div className={cn("text-zinc-600 dark:text-zinc-400 text-center")}>
            There was an error loading your binders.
            <br />
            Please try refreshing the page.
          </div>
        </div>
      }
    >
      <BindersContent binders={binders} />
    </DatabaseErrorBoundary>
  );
}

interface BindersContentProps {
  binders: any;
}

function BindersContent({ binders }: BindersContentProps) {
  if (binders === undefined) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <div className={cn("text-zinc-600 dark:text-zinc-400 flex items-center gap-2")}>
          <div 
            className={cn("animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full")} 
            role="status"
            aria-hidden="true"
          />
          Loading binders...
        </div>
      </div>
    );
  }

  return binders && binders.length !== 0 ? (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4")}
    >
      {binders.map((binder: any) => (
        <BinderCard key={binder.uuid} binder={binder} />
      ))}
    </div>
  ) : (
    <div className={cn("flex items-center justify-center h-full p-4")}>
      <EmptyBindersList />
    </div>
  );
}
