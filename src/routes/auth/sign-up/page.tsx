import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";

import { Button } from "@/components/ui/actions";
import { Form, FormInput } from "@/components/ui/forms";
import useUserActions from "@/utils/state/actions/_useUserActions";
import { SignUpSchema, type SignUpFormData } from "@/db/models/schemas/auth";

import cn from "@/utils/cn";
import { AuthCard } from "@/components/partials/layout";

export default function SignUpPage() {
  const { t } = useTranslation();
  const userActions = useUserActions();

  const handleSubmit = async ({ name, email, password }: SignUpFormData) => {
    await userActions.register(email, password, name);
  };

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo className={cn("size-16")} />
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight">
          {t("auth.signup.title", "Create your account")}
        </h2>
      </div>
      <div className="mt-10">
        <AuthCard>
          <Form<SignUpFormData>
            schema={SignUpSchema}
            onSubmit={handleSubmit}
            className="space-y-6"
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
            <Button type="submit" color="sky" className="w-full">
              {t("auth.signup.submit", "Sign up")}
            </Button>
          </Form>
        </AuthCard>
      </div>
    </main>
  );
}
