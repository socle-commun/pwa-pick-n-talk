import { PictogramsList } from "./PictogramsList";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { ErrorFallback } from "@/components/ui/feedback";
import { usePictograms } from "@/hooks/usePictograms";

export interface PictogramsGridProps {
  binderId: string;
  className?: string;
}

export default function PictogramsGrid({
  binderId,
  className,
}: PictogramsGridProps) {
  const pictograms = usePictograms(binderId);

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
      <PictogramsList pictograms={pictograms} className={className} />
    </DatabaseErrorBoundary>
  );
}
