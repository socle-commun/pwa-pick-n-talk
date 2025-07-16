import { type MouseEvent } from "react";

import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";

import { Divider } from "@/components/ui/layout";
import { Button } from "@/components/ui/actions";

import { type Binder } from "@/db/models/Binder";
import { db } from "@/db";

import cn from "@/utils/cn";

export default function BinderCard({
  binder,
  className,
  ...props
}: {
  binder: Binder;
  className?: string;
}) {
  const { t, i18n } = useTranslation();

  // Extract translated properties
  const title = binder.properties?.[i18n.language]?.title || "";
  const description = binder.properties?.[i18n.language]?.description || "";

  return (
    <div
      {...props}
      className={cn(
        className,
        "w-content h-content flex flex-col bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-md"
      )}
    >
      <Button
        href={`/${binder.id}`}
        plain
        className={cn("flex flex-col gap-1 bg-transparent rounded-b-none")}
      >
        <div className={cn("text-2xl font-bold")}>{title}</div>
        <div
          className={cn("pl-1 text-sm italic text-zinc-700 dark:text-zinc-300")}
        >
          {t("by")} {binder.author}
        </div>
        <div className={cn("text-lg text-zinc-800 dark:text-zinc-200 mb-2")}>
          {description}
        </div>
      </Button>
      <Divider className={cn("border-zinc-600 dark:border-zinc-400")} />
      <div className={cn("flex justify-end gap-1 px-2 py-1")}>
        <Button
          href={`${binder.id}/edit`}
          color="sky"
          className={cn(
            "hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150"
          )}
        >
          <PencilIcon className={cn("size-4")} />
          <span className={cn("sr-only")}>{t("edit")}</span>
        </Button>
        <Button
          color="red"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            db.deleteBinder(binder.id);
          }}
          className={cn(
            "hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150"
          )}
        >
          <TrashIcon className={cn("size-4")} />
          <span className={cn("sr-only")}>{t("delete")}</span>
        </Button>
      </div>
    </div>
  );
}
