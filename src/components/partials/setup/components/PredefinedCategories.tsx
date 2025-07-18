import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";

const PREDEFINED_CATEGORIES = [
  { id: "daily", name: "Daily Activities" },
  { id: "emotions", name: "Emotions" },
  { id: "food", name: "Food & Drinks" },
  { id: "social", name: "Social" },
  { id: "needs", name: "Basic Needs" },
  { id: "places", name: "Places" },
];

interface PredefinedCategoriesProps {
  existingCategories: Array<{ id: string; name: string }>;
  onAddCategory: (category: { id: string; name: string }) => void;
}

export default function PredefinedCategories({ existingCategories, onAddCategory }: PredefinedCategoriesProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("mb-4")}>
      <h4 className={cn("font-medium mb-2")}>
        {t("onboarding.binder.categories.predefined", "Quick Add:")}
      </h4>
      <div className={cn("flex flex-wrap gap-2")}>
        {PREDEFINED_CATEGORIES.map((predefined) => (
          <button
            key={predefined.id}
            type="button"
            onClick={() => onAddCategory(predefined)}
            disabled={existingCategories.some(c => c.id === predefined.id)}
            className={cn(
              "px-3 py-1 rounded text-sm transition-colors",
              existingCategories.some(c => c.id === predefined.id)
                ? "bg-tertiary text-tertiary cursor-not-allowed"
                : "bg-info-secondary text-info-text hover:bg-info-secondary/80 border border-info-border"
            )}
          >
            {t(`onboarding.binder.categories.${predefined.id}`, predefined.name)}
          </button>
        ))}
      </div>
    </div>
  );
}
