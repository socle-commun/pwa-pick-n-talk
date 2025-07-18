import { useState } from "react";
import type { OnboardingFormData } from "@/db/models/schemas/setup";
import type { Category } from "../components/CategorySelector";

export function useBinderCreation(
  data: Partial<OnboardingFormData>,
  onUpdate: (data: Partial<OnboardingFormData>) => void
) {
  const [categories, setCategories] = useState<Category[]>(data.binderCategories || []);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedPictograms, setSelectedPictograms] = useState(data.binderPictograms || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const addCategory = (categoryData: { id: string; name: string }) => {
    if (!categories.find(c => c.id === categoryData.id)) {
      const newCategories = [...categories, { ...categoryData, pictograms: [] }];
      setCategories(newCategories);
      onUpdate({ binderCategories: newCategories });
    }
  };

  const removeCategory = (categoryId: string) => {
    const newCategories = categories.filter(c => c.id !== categoryId);
    setCategories(newCategories);
    onUpdate({ binderCategories: newCategories });
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    }
  };

  const addCustomCategory = () => {
    if (newCategoryName.trim() && !categories.find(c => c.name === newCategoryName.trim())) {
      const newCategory = {
        id: `custom-${Date.now()}`,
        name: newCategoryName.trim(),
        pictograms: [],
      };
      addCategory(newCategory);
      setNewCategoryName("");
    }
  };

  const togglePictogram = (pictogramId: string) => {
    if (selectedCategory) {
      const updatedCategories = categories.map(category => {
        if (category.id === selectedCategory) {
          const currentPictograms = category.pictograms || [];
          const isAssigned = currentPictograms.includes(pictogramId);

          return {
            ...category,
            pictograms: isAssigned
              ? currentPictograms.filter(id => id !== pictogramId)
              : [...currentPictograms, pictogramId]
          };
        }
        return category;
      });

      setCategories(updatedCategories);
      onUpdate({ binderCategories: updatedCategories });
    }

    const isSelected = selectedPictograms.includes(pictogramId);
    const newSelection = isSelected
      ? selectedPictograms.filter(id => id !== pictogramId)
      : [...selectedPictograms, pictogramId];

    setSelectedPictograms(newSelection);
    onUpdate({ binderPictograms: newSelection });
  };

  return {
    categories,
    newCategoryName,
    setNewCategoryName,
    selectedPictograms,
    selectedCategory,
    setSelectedCategory,
    addCategory,
    removeCategory,
    addCustomCategory,
    togglePictogram,
  };
}
