import { useLiveQuery } from "dexie-react-hooks";
import { useTranslation } from "react-i18next";

import BinderCard from "@/components/partials/binders/BinderCard";
import EmptyBindersList from "@/components/partials/binders/EmptyBindersList";

import { db } from "@/db";

import cn from "@/utils/cn";

export default function IndexPage() {
  const { t, i18n } = useTranslation();

  const binders = useLiveQuery(
    async () => db.getTranslatedBinders(i18n.language),
    [db, t, i18n.language]
  );

  return binders && binders.length !== 0 ? (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4")}>
      {binders.map((binder) => (
        <BinderCard key={binder.uuid} binder={binder} />
      ))}
    </div>
  ) : (
    <div className={cn("flex items-center justify-center h-full p-4")}>
      <EmptyBindersList />
    </div>
  );
}