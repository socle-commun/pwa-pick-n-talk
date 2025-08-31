import { DatabaseErrorBoundary } from "@/components/ui/errors/DatabaseErrorBoundary";
import { ErrorFallback } from "@/components/ui/feedback";
import { useBinders } from "@/hooks/useBinders";

import { BindersList } from "./components";

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
