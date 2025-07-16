import { useForm } from "react-hook-form";

import Logo from "@/components/partials/global/Logo";

import { Button } from "@/components/ui/actions";
import { Field, Fieldset, Input, Label } from "@/components/ui/data-input";
import useUserActions from "@/utils/state/actions/_useUserActions";

import cn from "@/utils/cn";

type SignUpFormFields = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const userActions = useUserActions();
  const { register, handleSubmit } = useForm<SignUpFormFields>({});

  const onSubmit = ({ name, email, password }: SignUpFormFields) =>
    userActions.register(email, password, name);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
          <Logo className={cn("size-16")} />
          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-zinc-200 dark:bg-zinc-800 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Fieldset>
                <Field className={cn("mb-2")}>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("name", {
                      required: true,
                      minLength: 2,
                    })}
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                  />
                </Field>

                <Field className={cn("mb-2")}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email", {
                      required: true,
                      pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    })}
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </Field>

                <Field className={cn("mb-2")}>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password", { required: true, minLength: 16 })}
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                  />
                </Field>
              </Fieldset>

              <Button type="submit" color="sky" className="w-full">
                Sign up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
