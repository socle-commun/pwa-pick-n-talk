import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import PictogramCard from "./PictogramCard";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { db } from "@/db";
import cn from "@/utils/cn";

export interface PictogramsGridProps {
  binderUuid: string;
  className?: string;
}

export default function PictogramsGrid({
  binderUuid,
  className,
}: PictogramsGridProps) {
  const { i18n } = useTranslation();

  const pictograms = useLiveQuery(async () => {
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

  return (
    <DatabaseErrorBoundary
      fallback={
        <div className={cn("flex flex-col items-center justify-center p-8")}>
          <div className={cn("text-red-600 dark:text-red-400 text-xl mb-2")}>
            ⚠️ Failed to load pictograms
          </div>
          <div className={cn("text-zinc-600 dark:text-zinc-400 text-center")}>
            There was an error loading the pictograms for this binder.
            <br />
            Please try refreshing the page.
          </div>
        </div>
      }
    >
      <PictogramsGridContent 
        pictograms={pictograms} 
        className={className} 
      />
    </DatabaseErrorBoundary>
  );
}

interface PictogramsGridContentProps {
  pictograms: any;
  className?: string;
}

function PictogramsGridContent({ pictograms, className }: PictogramsGridContentProps) {
  if (pictograms === undefined) {
    return (
      <div className={cn("flex items-center justify-center p-8")}>
        <div className={cn("text-zinc-600 dark:text-zinc-400 flex items-center gap-2")}>
          <div 
            className={cn("animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full")} 
            role="status"
            aria-hidden="true"
          />
          Loading pictograms...
        </div>
      </div>
    );
  }

  if (pictograms.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8")}>
        <div className={cn("text-xl text-zinc-600 dark:text-zinc-400 mb-2")}>
          No pictograms found
        </div>
        <div className={cn("text-sm text-zinc-500 dark:text-zinc-500")}>
          This binder doesn&apos;t contain any pictograms yet.
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4",
        className
      )}
    >
      {pictograms.map((pictogram: any) => (
        <PictogramCard key={pictogram.uuid} pictogram={pictogram} />
      ))}
    </div>
  );
}
