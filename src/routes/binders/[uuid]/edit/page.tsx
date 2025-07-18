import { useTranslation } from "react-i18next";

import { BinderFormData } from "@/db/models/schemas/auth";
import BinderEditSection from "@/components/partials/binders/BinderEditSection";
import BinderEditForm from "@/components/partials/binders/BinderEditForm";

export default function BinderEditPage() {
  const { t } = useTranslation();

  const handleSubmit = async (data: BinderFormData) => {
    // TODO: Implement binder update functionality
    console.log("Binder update:", data);
  };

  // TODO: Get actual binder data from URL params and context/state
  const initialValues: Partial<BinderFormData> = {
    id: "example-binder-id",
    author: "John Doe",
    isFavorite: false
  };

  return (
    <BinderEditSection>
      <BinderEditForm initialValues={initialValues} onSubmit={handleSubmit} />
    </BinderEditSection>
  );
}
