import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";
import { Button } from "@mui/material";
import { Form, FormInput } from "@/components/ui/forms";
import Link from "@/components/partials/navigation/Link";
import { SignInSchema, type SignInFormData } from "@/db/models/schemas/auth";
import useUserActions from "@/utils/state/actions/_useUserActions";

export default function SignInPage() {
  const { t } = useTranslation();
  const userActions = useUserActions();

  const handleSubmit = async ({ email, password }: SignInFormData) => {
    await userActions.login(email, password);
  };

  return (
    <>
      <div >
        <div >
          <Logo className={"size-16"} />
          <h2 >
            {t("auth.signin.title", "Sign in to your account")}
          </h2>
        </div>

        <div >
          <div >
            <Form<SignInFormData>
              schema={SignInSchema}
              onSubmit={handleSubmit}
              
            >
              <FormInput
                name="email"
                label={t("auth.signin.email", "Email")}
                type="email"
                required
                autoComplete="email"
              />

              <FormInput
                name="password"
                label={t("auth.signin.password", "Password")}
                type="password"
                required
                autoComplete="current-password"
              />

              <div >
                <Link href="/auth/forgot-password">
                  {t("auth.signin.forgot_password", "Forgot password?")}
                </Link>
              </div>

              <Button type="submit" color="primary" sx={{ width: "100%" }}>
                {t("auth.signin.submit", "Sign in")}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
