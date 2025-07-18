import { useTranslation } from "react-i18next";
import { Form } from "@/components/ui/forms";
import { Button } from "@/components/ui/actions";
import { BinderStepSchema, type BinderStepData, type OnboardingFormData } from "@/db/models/schemas/setup";
import cn from "@/utils/cn";

import CategorySelector from "./components/CategorySelector";
import PictogramSelector from "./components/PictogramSelector";
import BinderBasicInfo from "./components/BinderBasicInfo";
import BinderTipSection from "./components/BinderTipSection";
import { useBinderCreation } from "./hooks/useBinderCreation";

interface BinderCreationStepProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
  onNext: () => void;
  isLastStep: boolean;
}

export default function BinderCreationStep({ data, onUpdate, onNext }: BinderCreationStepProps) {
  const { t } = useTranslation();
  const {
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
  } = useBinderCreation(data, onUpdate);

  const handleSubmit = async (formData: BinderStepData) => {
    const binderData = {
      ...formData,
      binderCategories: categories,
      binderPictograms: selectedPictograms,
    };
    onUpdate(binderData);
    onNext();
  };

  return (
    <div className={cn("space-y-6")}>
      <Form
        onSubmit={handleSubmit}
        schema={BinderStepSchema}
        initialValues={{
          binderName: data.binderName || "",
          binderDescription: data.binderDescription || "",
        }}
      >
        <BinderBasicInfo />
        <CategorySelector
          categories={categories}
          onAddCategory={addCategory}
          onRemoveCategory={removeCategory}
          newCategoryName={newCategoryName}
          onNewCategoryNameChange={setNewCategoryName}
          onAddCustomCategory={addCustomCategory}
        />
        <PictogramSelector
          categories={categories}
          selectedPictograms={selectedPictograms}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onPictogramToggle={togglePictogram}
        />
        <BinderTipSection />
        <div className={cn("flex justify-end")}>
          <Button type="submit" color="sky" className={cn("px-6 py-2")}>
            {t("onboarding.binder.create", "Create Binder")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
