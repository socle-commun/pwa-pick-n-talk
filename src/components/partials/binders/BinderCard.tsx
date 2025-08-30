import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/actions";
import { Divider } from "@/components/ui/layout";
import { db } from "@/db";
import { type Binder } from "@/db/models";
import { getTranslation } from "@/utils/translation";

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
  const title = getTranslation(binder.properties, i18n.language, "title");
  const description = getTranslation(binder.properties, i18n.language, "description");

  return (
    <div
      {...props}
      className={`${className || ""} w-content h-content flex flex-col theme-bg-secondary overflow-hidden rounded-md`}
    >
      <Button
        href={`/${binder.id}`}
        plain
        className={"flex flex-col gap-1 bg-transparent rounded-b-none"}
      >
        <div className={"text-2xl font-bold theme-text-primary"}>{title}</div>
        <div
          className={"pl-1 text-sm italic theme-text-secondary"}
        >
          {t("by")} {binder.author}
        </div>
        <div className={"text-lg theme-text-primary mb-2"}>
          {description}
        </div>
      </Button>
      <Divider className={"theme-border-secondary"} />
      <div className={"flex justify-end gap-1 px-2 py-1"}>
        <Button
          href={`${binder.id}/edit`}
          color="sky"
          className={"hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150"}
        >
          <PencilIcon className={"size-4"} />
          <span className={"sr-only"}>{t("edit")}</span>
        </Button>
        <Button
          color="red"
          onClick={(event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            db.deleteBinder(binder.id);
          }}
          className={"hover:scale-105 active:scale-95 transition-scale ease-in-out duration-150"}
        >
          <TrashIcon className={"size-4"} />
          <span className={"sr-only"}>{t("delete")}</span>
        </Button>
      </div>
    </div>
  );
}
