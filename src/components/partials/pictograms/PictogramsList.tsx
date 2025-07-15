import { PictogramsGridLayout } from "./PictogramsGridLayout";
import { LoadingSpinner, EmptyState } from "@/components/ui/feedback";

interface PictogramsListProps {
  pictograms: any;
  className?: string;
}

export function PictogramsList({ pictograms, className }: PictogramsListProps) {
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
