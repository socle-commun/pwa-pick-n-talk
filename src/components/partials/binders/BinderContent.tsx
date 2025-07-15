import { BinderHeader } from "@/components/partials/binders/BinderHeader";
import PictogramsGrid from "@/components/partials/pictograms/PictogramsGrid";
import { LoadingSpinner, ErrorFallback } from "@/components/ui/feedback";
import cn from "@/utils/cn";

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
      <PictogramsGrid binderUuid={uuid} />
    </div>
  );
}
