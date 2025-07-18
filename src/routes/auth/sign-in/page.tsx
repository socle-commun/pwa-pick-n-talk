import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";

import { Button } from "@/components/ui/actions";
import { Link } from "@/components/ui/navigation";
import { Form, FormInput } from "@/components/ui/forms";

import useUserActions from "@/utils/state/actions/_useUserActions";
import { SignInSchema, type SignInFormData } from "@/db/models/schemas/auth";

import cn from "@/utils/cn";
import { AuthCard } from "@/components/partials/layout";

export default function SignInPage() {
  const { t } = useTranslation();
  const userActions = useUserActions();

  const handleSubmit = async ({ email, password }: SignInFormData) => {
    await userActions.login(email, password);
  };

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo className={cn("size-16")} />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight">
          {t("auth.signin.title", "Sign in to your account")}
        </h2>
      </div>
      <div className="mt-10">
        <AuthCard>
          <Form<SignInFormData>
            schema={SignInSchema}
            onSubmit={handleSubmit}
            className="space-y-6"
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
            <div className="flex items-center justify-end">
              <Link href="/auth/forgot-password">
                {t("auth.signin.forgot_password", "Forgot password?")}
              </Link>
            </div>
            <Button type="submit" color="sky" className="w-full">
              {t("auth.signin.submit", "Sign in")}
            </Button>
          </Form>
        </AuthCard>
      </div>
    </main>
  );
}
