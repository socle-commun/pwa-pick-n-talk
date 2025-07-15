import BinderCard from "@/components/partials/binders/BinderCard";
import EmptyBindersList from "@/components/partials/binders/EmptyBindersList";
import { LoadingSpinner } from "@/components/ui/feedback";
import cn from "@/utils/cn";

interface BindersListProps {
  binders: any;
}

export function BindersList({ binders }: BindersListProps) {
  if (binders === undefined) {
    return <LoadingSpinner message="Loading binders..." />;
  }

  if (!binders || binders.length === 0) {
    return (
      <div className={cn("flex items-center justify-center h-full p-4")}>
        <EmptyBindersList />
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4")}>
      {binders.map((binder: any) => (
        <BinderCard key={binder.uuid} binder={binder} />
      ))}
    </div>
  );
}
