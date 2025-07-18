import { useState } from "react";
import cn from "@/utils/cn";
import { EyeIcon, EyeSlashIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { UserAccountData } from "@/db/models/schemas/setup";
import FormField from "./FormField";

interface UserFormProps {
  user: UserAccountData;
  index: number;
  users: UserAccountData[];
  errors: Record<string, string>;
  onUpdateUser: (index: number, field: keyof UserAccountData, value: string) => void;
  onRemoveUser: (index: number) => void;
  onUpdateConfirmPassword: (index: number, value: string) => void;
  confirmPasswords: Record<number, string>;
}

export default function UserForm({
  user,
  index,
  users,
  errors,
  onUpdateUser,
  onRemoveUser,
  onUpdateConfirmPassword,
  confirmPasswords,
}: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("border border-border rounded-lg p-4 space-y-4")}>
      <div className={cn("flex items-center justify-between mb-4")}>
        <h3 className={cn("text-lg font-medium text-primary")}>
          User {index + 1}
        </h3>
        {users.length > 1 && (
          <button
            type="button"
            onClick={() => onRemoveUser(index)}
            className={cn(
              "p-2 text-destructive hover:bg-destructive/10 rounded-md",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2"
            )}
            title="Remove user"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
        <FormField
          label="Full Name"
          value={user.name || ""}
          onChange={(value) => onUpdateUser(index, "name", value)}
          error={errors[`user-${index}-name`]}
          placeholder="Enter user's full name"
          required
        />

        <FormField
          label="Email Address"
          type="email"
          value={user.email || ""}
          onChange={(value) => onUpdateUser(index, "email", value)}
          error={errors[`user-${index}-email`]}
          placeholder="user@example.com"
          required
        />
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
        <div>
          <label className={cn("block text-sm font-medium text-foreground mb-2")}>
            Password (Optional)
          </label>
          <div className={cn("relative")}>
            <input
              type={showPassword ? "text" : "password"}
              value={user.password || ""}
              onChange={(e) => onUpdateUser(index, "password", e.target.value)}
              className={cn(
                "w-full px-3 py-2 pr-10 border rounded-md",
                "bg-background text-foreground",
                "border-border focus:border-success-primary focus:outline-none focus:ring-1 focus:ring-success-primary",
                errors[`user-${index}-password`] && "border-destructive"
              )}
              placeholder="Leave empty for no password"
            />
            {user.password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={cn(
                  "absolute right-3 top-1/2 transform -translate-y-1/2",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {showPassword ? <EyeSlashIcon className="w-[18px] h-[18px]" /> : <EyeIcon className="w-[18px] h-[18px]" />}
              </button>
            )}
          </div>
          {errors[`user-${index}-password`] && (
            <p className={cn("text-sm text-destructive mt-1")}>{errors[`user-${index}-password`]}</p>
          )}
        </div>

        {user.password && (
          <div>
            <label className={cn("block text-sm font-medium text-foreground mb-2")}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPasswords[index] || ""}
              onChange={(e) => onUpdateConfirmPassword(index, e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-md",
                "bg-background text-foreground",
                "border-border focus:border-success-primary focus:outline-none focus:ring-1 focus:ring-success-primary",
                errors[`user-${index}-confirmPassword`] && "border-destructive"
              )}
              placeholder="Confirm password"
            />
            {errors[`user-${index}-confirmPassword`] && (
              <p className={cn("text-sm text-destructive mt-1")}>{errors[`user-${index}-confirmPassword`]}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
