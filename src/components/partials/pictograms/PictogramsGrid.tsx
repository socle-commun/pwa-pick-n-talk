import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import PictogramCard from "./PictogramCard";
import { db } from "@/persistence";
import cn from "@/utilities/cn";

export interface PictogramsGridProps {
  binderUuid: string;
  className?: string;
}

export default function PictogramsGrid({ binderUuid, className }: PictogramsGridProps) {
  const { i18n } = useTranslation();

  const pictograms = useLiveQuery(async () => {
    try {
      return await db.getTranslatedPictogramsFromBinderUuid(binderUuid, i18n.language);
    } catch (error) {
      console.error("Failed to load pictograms:", error);
      return [];
    }
  }, [binderUuid, i18n.language]);

  if (!pictograms) {
    return (
      <div className={cn("flex items-center justify-center p-8")}>
        <div className={cn("text-zinc-600 dark:text-zinc-400")}>Loading pictograms...</div>
      </div>
    );
  }

  if (pictograms.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8")}>
        <div className={cn("text-xl text-zinc-600 dark:text-zinc-400 mb-2")}>No pictograms found</div>
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
        className,
      )}
    >
      {pictograms.map(pictogram => (
        <PictogramCard key={pictogram.uuid} pictogram={pictogram} />
      ))}
    </div>
  );
}
