import { BindersList } from "@/components/partials/binders/BindersList";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { ErrorFallback } from "@/components/ui/feedback";
import { useBinders } from "@/hooks/useBinders";

export default function IndexPage() {
  const binders = useBinders();

  return (
    <DatabaseErrorBoundary
      fallback={
        <ErrorFallback
          title="Failed to load binders"
          description={
            <>
              There was an error loading your binders.
              <br />
              Please try refreshing the page.
            </>
          }
        />
      }
    >
      <BindersList binders={binders} />
    </DatabaseErrorBoundary>
  );
}
