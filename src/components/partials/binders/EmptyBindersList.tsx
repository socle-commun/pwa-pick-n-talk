import { useTranslation } from "react-i18next";

import cn from "@/utilities/cn";

export default function EmptyBindersList({ className, ...props }: {
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div {...props} className={cn(className, "w-content h-content flex flex-col gap-2 p-4 bg-zinc-300 dark:bg-zinc-600 overflow-hidden rounded-md")}>
      {t("binders.list.empty")}
    </div>
  )
}