import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import { BinderHeader } from "@/components/partials/binders/BinderHeader";
import { LoadingSpinner, ErrorFallback } from "@/components/ui/feedback";
import { type Binder } from "@/db/models";
import cn from "@/utils/cn";
import { getTranslation } from "@/utils/translation";

// Lazy load the PictogramsGrid component
const PictogramsGrid = lazy(() => import("@/components/partials/pictograms/PictogramsGrid"));

interface BinderContentProps {
  binder: Binder | null | undefined;
  uuid: string;
}

export function BinderContent({ binder, uuid }: BinderContentProps) {
  const { i18n } = useTranslation();

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

  // Extract translated properties
  const title = getTranslation(binder.properties, i18n.language, "title");
  const description = getTranslation(binder.properties, i18n.language, "description");

  return (
    <div className={cn("min-h-full")}>
      <BinderHeader title={title} description={description} />
      <Suspense fallback={<LoadingSpinner message="Loading pictograms..." />}>
        <PictogramsGrid binderId={uuid} />
      </Suspense>
    </div>
  );
}
