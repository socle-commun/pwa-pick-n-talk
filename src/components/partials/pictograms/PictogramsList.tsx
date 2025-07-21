import { LoadingSpinner, EmptyState } from "@/components/ui/feedback";
import { type Pictogram } from "@/db/models";

import { PictogramsGridLayout } from "./PictogramsGridLayout";

interface PictogramsListProps {
  pictograms: Pictogram[] | null | undefined;
  className?: string;
}

export function PictogramsList({ pictograms, className }: PictogramsListProps) {
  if (pictograms === undefined) {
    return <LoadingSpinner message="Loading pictograms..." />;
  }

  if (!pictograms || pictograms.length === 0) {
    return (
      <EmptyState
        title="No pictograms found"
        description="This binder doesn't contain any pictograms yet."
      />
    );
  }

  return <PictogramsGridLayout pictograms={pictograms} className={className} />;
}
