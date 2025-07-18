import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/actions";
import { Form, FormInput } from "@/components/ui/forms";
import { ProfileEditSchema, type ProfileEditFormData } from "@/db/models/schemas/auth";

import cn from "@/utils/cn";
import PageSection from "@/components/partials/layout/PageSection";

export default function ProfilePage() {
  const { t } = useTranslation();

  const handleSubmit = async (data: ProfileEditFormData) => {
    // TODO: Implement profile update functionality
    console.log("Profile update:", data);
  };

  // TODO: Get actual user data from context/state
  const initialValues: Partial<ProfileEditFormData> = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user"
  };

  return (
    <PageSection title={t("profile.title", "Profile")}> 
      <PageSection title={t("profile.edit.title", "Edit Profile")} className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg">
        <Form<ProfileEditFormData>
          schema={ProfileEditSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <FormInput
            name="name"
            label={t("profile.edit.name", "Name")}
            type="text"
            required
          />
          <FormInput
            name="email"
            label={t("profile.edit.email", "Email")}
            type="email"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t("profile.edit.role", "Role")}
            </label>
            <select
              name="role"
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
            >
              <option value="user">{t("profile.roles.user", "User")}</option>
              <option value="caregiver">{t("profile.roles.caregiver", "Caregiver")}</option>
              <option value="professional">{t("profile.roles.professional", "Professional")}</option>
            </select>
          </div>
          <div className="flex gap-4">
            <Button type="submit" color="sky">
              {t("profile.edit.save", "Save Changes")}
            </Button>
            <Button type="button" outline>
              {t("profile.edit.cancel", "Cancel")}
            </Button>
          </div>
        </Form>
      </PageSection>
    </PageSection>
  );
}
