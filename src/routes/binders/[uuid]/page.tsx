import { useParams } from "react-router";
import { BinderContent } from "@/components/partials/binders/BinderContent";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { ErrorFallback } from "@/components/ui/feedback";
import { useBinder } from "@/hooks/useBinder";
import BinderPageSection from "@/components/partials/binders/BinderPageSection";

export default function BinderPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const binder = useBinder(uuid);

  if (!uuid) {
    return (
      <BinderPageSection>
        <ErrorFallback
          title="Invalid binder ID"
          description="The binder ID provided is not valid."
        />
      </BinderPageSection>
    );
  }

  return (
    <BinderPageSection>
      <DatabaseErrorBoundary
        fallback={
          <ErrorFallback
            title="Failed to load binder"
            description={
              <>
                There was an error loading this binder.
                <br />
                Please try refreshing the page.
              </>
            }
          />
        }
      >
        <BinderContent binder={binder} uuid={uuid} />
      </DatabaseErrorBoundary>
    </BinderPageSection>
  );
}
