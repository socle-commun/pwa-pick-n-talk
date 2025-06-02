import { useTranslation } from "react-i18next";

import { Divider } from "@/components/ui/layout";
import { Link } from "@/components/ui/navigation";
import { Button } from "@/components/ui/actions";

import { type TranslatedBinder } from "@/persistence/entities/translated/TranslatedBinder";

import cn from "@/utilities/cn";

export default function BinderCard({ binder, className, ...props }: {
  binder: TranslatedBinder;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <Link href={binder.uuid} {...props} className={cn(className, "w-content h-content flex flex-col gap-2 p-4 bg-zinc-300 dark:bg-zinc-600 overflow-hidden rounded-md")}>
      <div className={cn("flex flex-col md:flex-row items-baseline gap-1")}>
        <div className={cn("text-lg font-bold")}>{binder.title}</div>
        <div className={cn("text-sm italic pl-2 text-zinc-600 dark:text-zinc-500")}>{t("pages.settings.by")} {binder.author}</div>
      </div>
      <div className={cn("text-zinc-600 dark:text-zinc-500 mb-2")}>{binder.description}</div>
      <Divider className={cn("border-zinc-600 dark:border-zinc-400 -mx-4")} />
      <div className={cn("flex justify-end gap-2 -mx-4 px-2")}>
        <Link href={`${binder.uuid}/edit`} className={cn("w-11 flex items-center justify-center gap-2 p-2 text-sm md:text-base bg-sky-500 text-sky-50 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
          <span className={cn("icon")}>edit</span>
          <span className={cn("sr-only")}>{t("pages.settings.edit")}</span>
        </Link>
        <Button
          className={cn("hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150")}>
          <span className={cn("icon")}>delete</span>
          <span className={cn("sr-only")}>{t("pages.settings.delete")}</span>
        </Button>
      </div>
    </Link>
  )
}