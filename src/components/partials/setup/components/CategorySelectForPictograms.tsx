import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";
import type { Category } from "./CategorySelector";

interface CategorySelectForPictogramsProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function CategorySelectForPictograms({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategorySelectForPictogramsProps) {
  const { t } = useTranslation();

  if (categories.length === 0) return null;

  return (
    <div className={cn("mb-4")}>
      <p className={cn("text-sm font-medium mb-2")}>
        {t("onboarding.binder.pictograms.selectCategory", "Select a category to assign pictograms:")}
      </p>
      <div className={cn("flex flex-wrap gap-2")}>
        <button
          type="button"
          onClick={() => onCategorySelect(null)}
          className={cn(
            "px-3 py-1 rounded-full text-sm transition-colors",
            selectedCategory === null
              ? "bg-interactive-primary text-inverse"
              : "bg-tertiary text-secondary hover:bg-secondary border border-primary"
          )}
        >
          {t("onboarding.binder.pictograms.unassigned", "Unassigned")}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySelect(category.id)}
            className={cn(
              "px-3 py-1 rounded-full text-sm transition-colors",
              selectedCategory === category.id
                ? "bg-info-primary text-inverse"
                : "bg-info-secondary text-info-text hover:bg-info-secondary/80 border border-info-border"
            )}
          >
            {category.name}
            {category.pictograms && category.pictograms.length > 0 && (
              <span className={cn("ml-1 text-xs bg-info-text text-info-secondary rounded-full px-1.5 py-0.5")}>
                {category.pictograms.length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
