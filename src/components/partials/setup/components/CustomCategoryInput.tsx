import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";

interface CustomCategoryInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export default function CustomCategoryInput({ value, onChange, onAdd }: CustomCategoryInputProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("mb-4")}>
      <h4 className={cn("font-medium mb-2")}>
        {t("onboarding.binder.categories.custom", "Create Custom:")}
      </h4>
      <div className={cn("flex gap-2")}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("onboarding.binder.categories.placeholder", "Category name...")}
          className={cn("flex-1 px-3 py-1 border border-primary rounded bg-secondary text-primary")}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={!value.trim()}
          className={cn(
            "px-4 py-1 rounded transition-colors",
            !value.trim()
              ? "bg-tertiary text-tertiary cursor-not-allowed"
              : "bg-success-primary text-inverse hover:bg-success-primary/90"
          )}
        >
          {t("onboarding.binder.categories.add", "Add")}
        </button>
      </div>
    </div>
  );
}
