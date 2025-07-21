import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/actions";
import { Form, FormInput } from "@/components/ui/forms";
import { BinderFormSchema, type BinderFormData } from "@/db/models/schemas/auth";
import cn from "@/utils/cn";

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
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className={cn("text-2xl font-bold text-zinc-900 dark:text-white")}>
        {t("binder.edit.title", "Edit Binder")}
      </h1>

      <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg">
        <Form<BinderFormData>
          schema={BinderFormSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          className="space-y-6"
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              className="rounded border-zinc-300 dark:border-zinc-600"
            />
            <label
              htmlFor="isFavorite"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {t("binder.edit.is_favorite", "Mark as favorite")}
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="submit" color="sky">
              {t("binder.edit.save", "Save Changes")}
            </Button>
            <Button type="button" outline>
              {t("binder.edit.cancel", "Cancel")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
