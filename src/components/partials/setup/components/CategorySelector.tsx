import { useTranslation } from "react-i18next";
import cn from "@/utils/cn";
import PredefinedCategories from "./PredefinedCategories";
import CustomCategoryInput from "./CustomCategoryInput";

export interface Category {
  id: string;
  name: string;
  pictograms?: string[];
}

interface CategorySelectorProps {
  categories: Category[];
  onAddCategory: (category: { id: string; name: string }) => void;
  onRemoveCategory: (categoryId: string) => void;
  newCategoryName: string;
  onNewCategoryNameChange: (name: string) => void;
  onAddCustomCategory: () => void;
}

export default function CategorySelector({
  categories,
  onAddCategory,
  onRemoveCategory,
  newCategoryName,
  onNewCategoryNameChange,
  onAddCustomCategory,
}: CategorySelectorProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("border border-primary rounded-lg p-6")}>
      <h3 className={cn("text-lg font-semibold mb-4")}>
        📂 {t("onboarding.binder.categories.title", "Categories")}
      </h3>
      <p className={cn("text-sm text-secondary mb-4")}>
        {t("onboarding.binder.categories.description", "Add categories to organize your pictograms. You can choose from predefined categories or create your own.")}
      </p>

      <PredefinedCategories
        existingCategories={categories}
        onAddCategory={onAddCategory}
      />

      <CustomCategoryInput
        value={newCategoryName}
        onChange={onNewCategoryNameChange}
        onAdd={onAddCustomCategory}
      />

      {categories.length > 0 && (
        <div>
          <h4 className={cn("font-medium mb-2")}>
            {t("onboarding.binder.categories.selected", "Selected Categories:")}
          </h4>
          <div className={cn("flex flex-wrap gap-2")}>
            {categories.map((category) => (
              <span
                key={category.id}
                className={cn("inline-flex items-center gap-1 px-3 py-1 bg-success-secondary text-success-text rounded-full text-sm border border-success-border")}
              >
                {category.name}
                {category.pictograms && category.pictograms.length > 0 && (
                  <span className={cn("text-xs bg-success-text text-success-secondary rounded-full px-1.5 py-0.5")}>
                    {category.pictograms.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onRemoveCategory(category.id)}
                  className={cn("ml-1 text-success-text hover:text-error-text")}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
