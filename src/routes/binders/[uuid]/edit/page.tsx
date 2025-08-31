import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Form, FormInput } from "@/components/ui/forms";
import { BinderFormSchema, type BinderFormData } from "@/db/models/schemas/auth";

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
    <div >
      <h1 className={"text-2xl font-bold text-zinc-900 dark:text-white"}>
        {t("binder.edit.title", "Edit Binder")}
      </h1>

      <div >
        <Form<BinderFormData>
          schema={BinderFormSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}

        >
          <FormInput
            name="id"
            label={t("binder.edit.id", "Binder ID")}
            type="text"
            required
            disabled
          />

          <FormInput
            name="author"
            label={t("binder.edit.author", "Author")}
            type="text"
            required
          />

          <div >
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"

            />
            <label
              htmlFor="isFavorite"

            >
              {t("binder.edit.is_favorite", "Mark as favorite")}
            </label>
          </div>

          <div >
            <Button type="submit" color="primary">
              {t("binder.edit.save", "Save Changes")}
            </Button>
            <Button type="button" variant="outlined">
              {t("binder.edit.cancel", "Cancel")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
