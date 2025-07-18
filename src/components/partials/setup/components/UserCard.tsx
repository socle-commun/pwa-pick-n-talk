import cn from "@/utils/cn";
import { CheckIcon } from "@heroicons/react/24/outline";
import type { UserAccountData } from "@/db/models/schemas/setup";

interface UserCardProps {
  user: UserAccountData & { id?: string; role?: string };
  isAssigned: boolean;
  onToggle: () => void;
}

export default function UserCard({ user, isAssigned, onToggle }: UserCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "p-4 border rounded-lg text-left transition-all",
        "focus:outline-none focus:ring-2 focus:ring-info-primary focus:ring-offset-2",
        isAssigned
          ? "border-info-primary bg-info-primary/10 text-info-text"
          : "border-border bg-background hover:border-info-primary hover:bg-info-primary/5"
      )}
    >
      <div className={cn("flex items-center justify-between")}>
        <div className={cn("flex-1")}>
          <div className={cn("flex items-center gap-2 mb-1")}>
            <h4 className={cn("font-medium")}>
              {user.name}
            </h4>
            <span className={cn(
              "px-2 py-0.5 text-xs rounded-full",
              user.role === "caregiver"
                ? "bg-info-secondary text-info-text"
                : "bg-success-secondary text-success-text"
            )}>
              {user.role}
            </span>
          </div>
          <p className={cn("text-sm text-muted-foreground")}>
            {user.email}
          </p>
        </div>

        {isAssigned && (
          <div className={cn("w-6 h-6 bg-info-primary rounded-full flex items-center justify-center ml-3")}>
            <CheckIcon className={cn("w-3.5 h-3.5 text-white")} />
          </div>
        )}
      </div>
    </button>
  );
}
