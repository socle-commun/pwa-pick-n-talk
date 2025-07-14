import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import cn from "@/utils/cn";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h1 className={cn("text-2xl font-bold text-zinc-900 dark:text-white")}>
        {t("Settings", "Settings")}
      </h1>

      <div className="max-w-md">
        <LocaleSelector />
      </div>
    </div>
  );
}
