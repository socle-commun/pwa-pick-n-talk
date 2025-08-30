import { useTranslation } from "react-i18next";


export default function EmptyBindersList({
  className,
  ...props
}: {
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div
      {...props}
      className={`${className || ""} w-content h-content flex flex-col gap-2 p-4 theme-bg-tertiary theme-text-secondary overflow-hidden rounded-md`}
    >
      {t("binders.list.empty")}
    </div>
  );
}
