import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";

import cn from "@/utilities/cn";

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <div className={cn("flex items-center justify-center h-full p-4")}>
      <Logo className={cn("size-16")} />
      {t("home.title")}
    </div>
  );
}
