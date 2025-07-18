/**
 * BinderEditForm – Formulaire d'édition de classeur, centralisé et typé.
 */
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/actions";
import { Form, FormInput } from "@/components/ui/forms";
import { BinderFormSchema, type BinderFormData } from "@/db/models/schemas/auth";
import cn from "@/utils/cn";

export interface BinderEditFormProps {
  initialValues: Partial<BinderFormData>;
  onSubmit: (data: BinderFormData) => void;
}

export default function BinderEditForm({ initialValues, onSubmit }: BinderEditFormProps) {
  const { t } = useTranslation();
  return (
    <Form<BinderFormData>
      schema={BinderFormSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
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
  );
}
