import { BindersList } from "@/components/partials/binders/BindersList";
import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { ErrorFallback } from "@/components/ui/feedback";
import { useBinders } from "@/hooks/useBinders";
import BindersSection from "@/components/partials/binders/BindersSection";

export default function IndexPage() {
  const binders = useBinders();

  return (
    <BindersSection>
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
    </BindersSection>
  );
}
