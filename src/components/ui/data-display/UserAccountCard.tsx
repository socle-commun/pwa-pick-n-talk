/**
 * @file src/components/ui/data-display/UserAccountCard.tsx
 * @description Reusable card component for displaying user account information.
 *
 * This component provides:
 * - Standardized layout for user account display
 * - Role-based icon and color theming
 * - Edit and delete action buttons
 * - Accessible and responsive design
 */

import { type ReactNode } from "react";
import { Button } from "@/components/ui/actions";
import { type User, type Role } from "@/db/models";
import cn from "@/utils/cn";

interface UserAccountCardProps {
  user: User;
  icon: ReactNode;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  editLabel: string;
  deleteLabel: string;
  getRoleDisplayName: (role: Role) => string;
  className?: string;
}

export default function UserAccountCard({
  user,
  icon,
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  getRoleDisplayName,
  className,
}: UserAccountCardProps) {
  const getIconStyles = (role: Role) => {
    return role === "caregiver"
      ? "feature-primary-secondary dark:bg-[color:var(--feature-primary-primary)]/20 feature-primary-primary dark:feature-primary-text"
      : "feature-secondary-secondary dark:bg-[color:var(--feature-secondary-primary)]/20 feature-secondary-primary dark:feature-secondary-text";
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "size-10 rounded-full flex items-center justify-center",
          getIconStyles(user.role)
        )}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {user.email} • {getRoleDisplayName(user.role)}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          outline
          onClick={() => onEdit(user)}
          className="text-sm px-3 py-1"
        >
          {editLabel}
        </Button>
        <Button
          color="red"
          onClick={() => onDelete(user)}
          className="text-sm px-3 py-1"
        >
          {deleteLabel}
        </Button>
      </div>
    </div>
  );
}
