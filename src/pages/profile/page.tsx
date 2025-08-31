import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Form, FormInput } from "@/components/ui/forms";
import { ProfileEditSchema, type ProfileEditFormData } from "@/db/models/schemas/auth";

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
    <div >
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 4 }}>
        {t("profile.title", "Profile")}
      </Typography>

      <div >
        <h2 >
          {t("profile.edit.title", "Edit Profile")}
        </h2>

        <Form<ProfileEditFormData>
          schema={ProfileEditSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}

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

          <div >
            <label >
              {t("profile.edit.role", "Role")}
            </label>
            <select
              name="role"

            >
              <option value="user">{t("profile.roles.user", "User")}</option>
              <option value="caregiver">{t("profile.roles.caregiver", "Caregiver")}</option>
              <option value="professional">{t("profile.roles.professional", "Professional")}</option>
            </select>
          </div>

          <div >
            <Button type="submit" color="primary">
              {t("profile.edit.save", "Save Changes")}
            </Button>
            <Button type="button" variant="outlined">
              {t("profile.edit.cancel", "Cancel")}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
