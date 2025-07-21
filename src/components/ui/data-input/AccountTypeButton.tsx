/**
 * @file src/components/ui/data-input/AccountTypeButton.tsx
 * @description Reusable button component for selecting account types in onboarding flows.
 *
 * This component provides:
 * - Standardized styling for account type selection
 * - Icon and text layout for better UX
 * - Theme-based colors for accessibility
 * - Hover and focus states
 */

import { type ReactNode } from "react";
import { Heading } from "@/components/ui/typography";
import cn from "@/utils/cn";

interface AccountTypeButtonProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function AccountTypeButton({
  title,
  description,
  icon,
  onClick,
  variant = "primary",
  className,
}: AccountTypeButtonProps) {
  const variantStyles = {
    primary: {
      button: "hover:feature-primary-border hover:feature-primary-secondary dark:hover:bg-[color:var(--feature-primary-primary)]/20",
      icon: "feature-primary-primary dark:feature-primary-text",
    },
    secondary: {
      button: "hover:feature-secondary-border hover:feature-secondary-secondary dark:hover:bg-[color:var(--feature-secondary-primary)]/20",
      icon: "feature-secondary-primary dark:feature-secondary-text",
    },
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-600",
        "transition-colors duration-200 text-center group",
        variantStyles[variant].button,
        className
      )}
    >
      <div className={cn("mb-4 flex justify-center", variantStyles[variant].icon)}>
        {icon}
      </div>
      <Heading level={3} className="text-lg mb-2">
        {title}
      </Heading>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </button>
  );
}
