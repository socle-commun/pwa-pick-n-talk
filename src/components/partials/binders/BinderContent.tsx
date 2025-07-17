import { lazy, Suspense } from "react";
import { BinderHeader } from "@/components/partials/binders/BinderHeader";
import { LoadingSpinner, ErrorFallback } from "@/components/ui/feedback";
import cn from "@/utils/cn";

// Lazy load the PictogramsGrid component
const PictogramsGrid = lazy(() => import("@/components/partials/pictograms/PictogramsGrid"));

interface BinderContentProps {
  binder: any;
  uuid: string;
}

export function BinderContent({ binder, uuid }: BinderContentProps) {
  if (binder === undefined) {
    return <LoadingSpinner message="Loading binder..." />;
  }

  if (!binder) {
    return (
      <ErrorFallback
        title="Binder not found"
        description="The requested binder could not be found."
      />
    );
  }

  return (
    <div className={cn("min-h-full")}>
      <BinderHeader title={binder.title} description={binder.description} />
      <Suspense fallback={<LoadingSpinner message="Loading pictograms..." />}>
        <PictogramsGrid binderId={uuid} />
      </Suspense>
    </div>
  );
}
