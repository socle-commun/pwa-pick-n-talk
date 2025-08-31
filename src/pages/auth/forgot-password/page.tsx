import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";
import Link from "@/components/partials/navigation/Link";
import { Form, FormInput } from "@/components/ui/forms";
import { ForgotPasswordSchema, type ForgotPasswordFormData } from "@/db/models/schemas/auth";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const handleSubmit = async ({ email }: ForgotPasswordFormData) => {
    // TODO: Implement password reset functionality in userActions
    console.log("Password reset requested for:", email);
    // For now, we'll just log the request until the backend is implemented
  };

  return (
    <>
      <div >
        <div >
          <Logo sx={{ width: 64, height: 64 }} />
          <h2 >
            {t("auth.forgot_password.title", "Reset your password")}
          </h2>
          <p >
            {t("auth.forgot_password.description", "Enter your email address and we'll send you a link to reset your password.")}
          </p>
        </div>

        <div >
          <div >
            <Form<ForgotPasswordFormData>
              schema={ForgotPasswordSchema}
              onSubmit={handleSubmit}

            >
              <FormInput
                name="email"
                label={t("auth.forgot_password.email", "Email")}
                type="email"
                required
                autoComplete="email"
              />

              <Button type="submit" color="primary" sx={{ width: "100%" }}>
                {t("auth.forgot_password.submit", "Send reset link")}
              </Button>

              <div >
                <Link href="/auth/sign-in">
                  {t("auth.forgot_password.back_to_signin", "Back to sign in")}
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
