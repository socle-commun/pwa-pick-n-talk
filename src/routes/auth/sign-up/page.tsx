import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";
import { Form, FormInput } from "@/components/ui/forms";
import { SignUpSchema, type SignUpFormData } from "@/db/models/schemas/auth";
import useUserActions from "@/utils/state/actions/_useUserActions";

export default function SignUpPage() {
  const { t } = useTranslation();
  const userActions = useUserActions();

  const handleSubmit = async ({ name, email, password }: SignUpFormData) => {
    await userActions.register(email, password, name);
  };

  return (
    <>
      <div >
        <div >
          <Logo className={"size-16"} />
          <h2 >
            {t("auth.signup.title", "Create your account")}
          </h2>
        </div>

        <div >
          <div >
            <Form<SignUpFormData>
              schema={SignUpSchema}
              onSubmit={handleSubmit}

            >
              <FormInput
                name="name"
                label={t("auth.signup.name", "Name")}
                type="text"
                required
                autoComplete="name"
              />

              <FormInput
                name="email"
                label={t("auth.signup.email", "Email")}
                type="email"
                required
                autoComplete="email"
              />

              <FormInput
                name="password"
                label={t("auth.signup.password", "Password")}
                type="password"
                required
                autoComplete="new-password"
              />

              <Button type="submit" color="primary" sx={{ width: "100%" }}>
                {t("auth.signup.submit", "Sign up")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
