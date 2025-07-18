import cn from "@/utils/cn";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  showConfirmPassword?: boolean;
  confirmValue?: string;
  onConfirmChange?: (value: string) => void;
  confirmError?: string;
}

export default function PasswordField({
  label,
  value,
  onChange,
  error,
  placeholder = "Leave empty for no password",
  showConfirmPassword = false,
  confirmValue = "",
  onConfirmChange,
  confirmError,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
      <div>
        <label className={cn("block text-sm font-medium text-foreground mb-2")}>
          {label}
        </label>
        <div className={cn("relative")}>
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full px-3 py-2 pr-10 border rounded-md",
              "bg-background text-foreground",
              "border-border focus:border-info-primary focus:outline-none focus:ring-1 focus:ring-info-primary",
              error && "border-destructive"
            )}
            placeholder={placeholder}
          />
          {value && (
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
        {error && (
          <p className={cn("text-sm text-destructive mt-1")}>{error}</p>
        )}
      </div>

      {showConfirmPassword && value && (
        <div>
          <label className={cn("block text-sm font-medium text-foreground mb-2")}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmValue}
            onChange={(e) => onConfirmChange?.(e.target.value)}
            className={cn(
              "w-full px-3 py-2 border rounded-md",
              "bg-background text-foreground",
              "border-border focus:border-info-primary focus:outline-none focus:ring-1 focus:ring-info-primary",
              confirmError && "border-destructive"
            )}
            placeholder="Confirm password"
          />
          {confirmError && (
            <p className={cn("text-sm text-destructive mt-1")}>{confirmError}</p>
          )}
        </div>
      )}
    </div>
  );
}
