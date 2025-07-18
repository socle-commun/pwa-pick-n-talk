import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";
import type { Category } from "./CategorySelector";
import CategorySelectForPictograms from "./CategorySelectForPictograms";
import { SAMPLE_PICTOGRAMS } from "./pictogramData";

interface PictogramSelectorProps {
  categories: Category[];
  selectedPictograms: string[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onPictogramToggle: (pictogramId: string) => void;
}

export default function PictogramSelector({
  categories,
  selectedPictograms,
  selectedCategory,
  onCategorySelect,
  onPictogramToggle,
}: PictogramSelectorProps) {
  const { t } = useTranslation();

  const getPictogramsByCategory = (categoryId: string | null) => {
    if (categoryId === null) {
      return SAMPLE_PICTOGRAMS.filter(p =>
        !categories.some(c => c.id === p.category)
      );
    }
    return SAMPLE_PICTOGRAMS.filter(p => p.category === categoryId);
  };

  return (
    <div className={cn("border border-primary rounded-lg p-6")}>
      <h3 className={cn("text-lg font-semibold mb-4")}>
        🎨 {t("onboarding.binder.pictograms.title", "Pictograms")}
      </h3>
      <p className={cn("text-sm text-secondary mb-4")}>
        {t("onboarding.binder.pictograms.description", "Select pictograms and assign them to categories. Click on a category first, then click on pictograms to assign them.")}
      </p>

      <CategorySelectForPictograms
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-3")}>
        {getPictogramsByCategory(selectedCategory).map((pictogram) => {
          const isSelected = selectedPictograms.includes(pictogram.id);
          const isAssignedToCurrentCategory = selectedCategory &&
            categories.find(c => c.id === selectedCategory)?.pictograms?.includes(pictogram.id);

          return (
            <button
              key={pictogram.id}
              type="button"
              onClick={() => onPictogramToggle(pictogram.id)}
              className={cn(
                "p-3 border rounded-lg text-center transition-all hover:scale-105",
                isSelected
                  ? "border-success-border bg-success-secondary text-success-text"
                  : isAssignedToCurrentCategory
                  ? "border-info-border bg-info-secondary text-info-text"
                  : "border-primary bg-secondary text-primary hover:bg-tertiary"
              )}
            >
              <div className={cn("text-2xl mb-1")}>{pictogram.emoji}</div>
              <div className={cn("text-xs font-medium")}>{pictogram.name}</div>
              {isAssignedToCurrentCategory && (
                <div className={cn("text-xs text-info-text mt-1")}>
                  ✓ {t("onboarding.binder.pictograms.assigned", "Assigned")}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
