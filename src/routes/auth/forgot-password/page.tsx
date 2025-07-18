import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/actions";
import { Link } from "@/components/ui/navigation";
import { Form, FormInput } from "@/components/ui/forms";

import Logo from "@/components/partials/global/Logo";

import { ForgotPasswordSchema, type ForgotPasswordFormData } from "@/db/models/schemas/auth";

import cn from "@/utils/cn";
import { AuthCard } from "@/components/partials/layout";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const handleSubmit = async ({ email }: ForgotPasswordFormData) => {
    // TODO: Implement password reset functionality in userActions
    console.log("Password reset requested for:", email);
    // For now, we'll just log the request until the backend is implemented
  };

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo className={cn("size-16")} />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight">
          {t("auth.forgot_password.title", "Reset your password")}
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {t("auth.forgot_password.description", "Enter your email address and we'll send you a link to reset your password.")}
        </p>
      </div>
      <div className="mt-10">
        <AuthCard>
          <Form<ForgotPasswordFormData>
            schema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <FormInput
              name="email"
              label={t("auth.forgot_password.email", "Email")}
              type="email"
              required
              autoComplete="email"
            />
            <Button type="submit" color="sky" className="w-full">
              {t("auth.forgot_password.submit", "Send reset link")}
            </Button>
            <div className="text-center">
              <Link href="/auth/sign-in">
                {t("auth.forgot_password.back_to_signin", "Back to sign in")}
              </Link>
            </div>
          </Form>
        </AuthCard>
      </div>
    </main>
  );
}
