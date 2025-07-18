import { useTranslation } from "react-i18next";
import { useState } from "react";

import { Form, FormInput } from "@/components/ui/forms";
import { Button } from "@/components/ui/actions";
import { BinderStepSchema, type BinderStepData, type OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

interface BinderCreationStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function BinderCreationStep({ data, onUpdate, onNext }: BinderCreationStepProps) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState(data.binderCategories || []);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedPictograms, setSelectedPictograms] = useState(data.binderPictograms || []);

  // Predefined categories for easier setup
  const predefinedCategories = [
    { id: "daily", name: t("onboarding.binder.categories.daily", "Daily Activities") },
    { id: "emotions", name: t("onboarding.binder.categories.emotions", "Emotions") },
    { id: "food", name: t("onboarding.binder.categories.food", "Food & Drinks") },
    { id: "social", name: t("onboarding.binder.categories.social", "Social") },
    { id: "needs", name: t("onboarding.binder.categories.needs", "Basic Needs") },
    { id: "places", name: t("onboarding.binder.categories.places", "Places") },
  ];

  // Sample pictograms for demonstration (in a real app, these would come from a database)
  const samplePictograms = [
    { id: "hello", name: "Hello", category: "social", emoji: "👋" },
    { id: "eat", name: "Eat", category: "daily", emoji: "🍽️" },
    { id: "drink", name: "Drink", category: "daily", emoji: "🥤" },
    { id: "happy", name: "Happy", category: "emotions", emoji: "😊" },
    { id: "sad", name: "Sad", category: "emotions", emoji: "😢" },
    { id: "help", name: "Help", category: "needs", emoji: "🆘" },
    { id: "home", name: "Home", category: "places", emoji: "🏠" },
    { id: "school", name: "School", category: "places", emoji: "🏫" },
  ];

  const handleSubmit = async (formData: BinderStepData) => {
    const binderData = {
      ...formData,
      binderCategories: categories,
      binderPictograms: selectedPictograms,
    };
    onUpdate(binderData);
    onNext();
  };

  const addCategory = (categoryData: { id: string; name: string }) => {
    if (!categories.find(c => c.id === categoryData.id)) {
      const newCategories = [...categories, categoryData];
      setCategories(newCategories);
      onUpdate({ binderCategories: newCategories });
    }
  };

  const removeCategory = (categoryId: string) => {
    const newCategories = categories.filter(c => c.id !== categoryId);
    setCategories(newCategories);
    onUpdate({ binderCategories: newCategories });
  };

  const addCustomCategory = () => {
    if (newCategoryName.trim() && !categories.find(c => c.name === newCategoryName.trim())) {
      const newCategory = {
        id: `custom-${Date.now()}`,
        name: newCategoryName.trim(),
      };
      addCategory(newCategory);
      setNewCategoryName("");
    }
  };

  const togglePictogram = (pictogramId: string) => {
    const newPictograms = selectedPictograms.includes(pictogramId)
      ? selectedPictograms.filter(id => id !== pictogramId)
      : [...selectedPictograms, pictogramId];
    
    setSelectedPictograms(newPictograms);
    onUpdate({ binderPictograms: newPictograms });
  };

  return (
    <div className={cn("space-y-6")}>
      <div className={cn("text-center mb-8")}>
        <div className={cn("text-4xl mb-4")}>📁</div>
        <p className={cn("text-lg text-zinc-600 dark:text-zinc-400")}>
          {t("onboarding.binder.intro", 
            "Now let's create your first communication binder! Add categories and select some pictograms to get started."
          )}
        </p>
      </div>

      <Form<BinderStepData>
        schema={BinderStepSchema}
        initialValues={{
          binderName: data.binderName || "",
          binderDescription: data.binderDescription || "",
          binderCategories: categories,
          binderPictograms: selectedPictograms,
        }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Basic Binder Info */}
        <div className={cn("space-y-4")}>
          <FormInput
            name="binderName"
            label={t("onboarding.binder.name.label", "Binder Name")}
            placeholder={t("onboarding.binder.name.placeholder", "e.g., My Daily Words, Meal Time, Emotions...")}
            required
            autoComplete="off"
          />

          <FormInput
            name="binderDescription"
            label={t("onboarding.binder.description.label", "Description (optional)")}
            placeholder={t("onboarding.binder.description.placeholder", "Brief description of this binder's purpose...")}
            autoComplete="off"
          />
        </div>

        {/* Categories Section */}
        <div className={cn("border border-zinc-200 dark:border-zinc-700 rounded-lg p-6")}>
          <h3 className={cn("text-lg font-semibold mb-4")}>
            📂 {t("onboarding.binder.categories.title", "Categories")}
          </h3>
          <p className={cn("text-sm text-zinc-600 dark:text-zinc-400 mb-4")}>
            {t("onboarding.binder.categories.description", "Categories help organize your pictograms. Choose some to get started:")}
          </p>

          {/* Predefined Categories */}
          <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-2 mb-4")}>
            {predefinedCategories.map((category) => {
              const isSelected = categories.find(c => c.id === category.id);
              return isSelected ? (
                <Button
                  key={category.id}
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  color="sky"
                  className={cn("text-sm")}
                >
                  {category.name}
                </Button>
              ) : (
                <Button
                  key={category.id}
                  type="button"
                  onClick={() => addCategory(category)}
                  outline
                  className={cn("text-sm")}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Custom Category Input */}
          <div className={cn("flex gap-2")}>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder={t("onboarding.binder.categories.custom", "Add custom category...")}
              className={cn(
                "flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md",
                "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
                "focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              )}
              onKeyPress={(e) => e.key === "Enter" && addCustomCategory()}
            />
            <Button type="button" onClick={addCustomCategory} disabled={!newCategoryName.trim()}>
              {t("onboarding.binder.categories.add", "Add")}
            </Button>
          </div>

          {/* Selected Categories */}
          {categories.length > 0 && (
            <div className={cn("mt-4")}>
              <p className={cn("text-sm font-medium mb-2")}>
                {t("onboarding.binder.categories.selected", "Selected Categories:")}
              </p>
              <div className={cn("flex flex-wrap gap-2")}>
                {categories.map((category) => (
                  <span
                    key={category.id}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 rounded-full text-sm"
                    )}
                  >
                    {category.name}
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className={cn("ml-1 text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200")}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pictograms Section */}
        <div className={cn("border border-zinc-200 dark:border-zinc-700 rounded-lg p-6")}>
          <h3 className={cn("text-lg font-semibold mb-4")}>
            🎨 {t("onboarding.binder.pictograms.title", "Pictograms")}
          </h3>
          <p className={cn("text-sm text-zinc-600 dark:text-zinc-400 mb-4")}>
            {t("onboarding.binder.pictograms.description", "Select some pictograms to add to your binder:")}
          </p>

          <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-3")}>
            {samplePictograms.map((pictogram) => {
              const isSelected = selectedPictograms.includes(pictogram.id);
              return (
                <button
                  key={pictogram.id}
                  type="button"
                  onClick={() => togglePictogram(pictogram.id)}
                  className={cn(
                    "p-4 border-2 rounded-lg text-center transition-all",
                    isSelected
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                  )}
                >
                  <div className={cn("text-2xl mb-2")}>{pictogram.emoji}</div>
                  <div className={cn("text-sm font-medium")}>{pictogram.name}</div>
                  <div className={cn("text-xs text-zinc-500 dark:text-zinc-400")}>
                    {predefinedCategories.find(c => c.id === pictogram.category)?.name}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedPictograms.length > 0 && (
            <div className={cn("mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg")}>
              <p className={cn("text-sm text-green-800 dark:text-green-200")}>
                ✅ {t("onboarding.binder.pictograms.selected", "Selected {{count}} pictogram(s)", { count: selectedPictograms.length })}
              </p>
            </div>
          )}
        </div>

        <div className={cn("bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg")}>
          <h3 className={cn("font-semibold text-blue-800 dark:text-blue-200 mb-2")}>
            💡 {t("onboarding.binder.tip.title", "Pro Tip")}
          </h3>
          <p className={cn("text-blue-700 dark:text-blue-300 text-sm")}>
            {t("onboarding.binder.tip.content", 
              "Don't worry about making it perfect now. You can always add more categories and pictograms later, or create additional binders for different situations."
            )}
          </p>
        </div>

        <div className={cn("text-center pt-4")}>
          <button
            type="submit"
            className={cn(
              "px-8 py-3 rounded-lg transition-colors",
              "bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            )}
          >
            {t("onboarding.binder.create", "Create My First Binder")}
          </button>
        </div>
      </Form>
    </div>
  );
}