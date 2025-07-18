import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";

export default function BinderTipSection() {
  const { t } = useTranslation();

  return (
    <div className={cn("bg-info-secondary border border-info-border rounded-lg p-4")}>
      <div className={cn("flex items-start gap-3")}>
        <span className={cn("text-lg")}>💡</span>
        <div>
          <h4 className={cn("font-semibold text-info-text mb-1")}>
            {t("onboarding.binder.tip.title", "Pro Tip")}
          </h4>
          <p className={cn("text-sm text-info-text")}>
            {t("onboarding.binder.tip.description", "You can create multiple binders for different situations (home, school, work). Start with something familiar like daily activities or basic needs.")}
          </p>
        </div>
      </div>
    </div>
  );
}
