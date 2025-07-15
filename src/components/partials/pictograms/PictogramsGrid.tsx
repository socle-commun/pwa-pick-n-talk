import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import { PictogramsGridLayout } from "./PictogramsGridLayout";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { LoadingSpinner, EmptyState, ErrorFallback } from "@/components/ui/feedback";
import { db } from "@/db";

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
        <ErrorFallback
          title="Failed to load pictograms"
          description={
            <>
              There was an error loading the pictograms for this binder.
              <br />
              Please try refreshing the page.
            </>
          }
        />
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
    return <LoadingSpinner message="Loading pictograms..." />;
  }

  if (pictograms.length === 0) {
    return (
      <EmptyState
        title="No pictograms found"
        description="This binder doesn't contain any pictograms yet."
      />
    );
  }

  return <PictogramsGridLayout pictograms={pictograms} className={className} />;
}
