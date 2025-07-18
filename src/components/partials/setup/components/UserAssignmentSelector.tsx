import { UsersIcon, CheckIcon } from "@heroicons/react/24/outline";
import cn from "@/utils/cn";

import type { OnboardingFormData } from "@/db/models/schemas/setup";

interface UserAssignmentSelectorProps {
  data: Partial<OnboardingFormData>;
  onUpdate: (data: Partial<OnboardingFormData>) => void;
}

export default function UserAssignmentSelector({ data, onUpdate }: UserAssignmentSelectorProps) {
  const allUsers = [
    ...(data.caregiver ? [{ ...data.caregiver, id: "caregiver", role: "caregiver" }] : []),
    ...(data.users || []).map((user, index) => ({ ...user, id: `user-${index}`, role: "user" })),
  ];

  const assignedUsers = data.binderAssignedUsers || [];

  const handleUserToggle = (userId: string) => {
    const newAssignedUsers = assignedUsers.includes(userId)
      ? assignedUsers.filter(id => id !== userId)
      : [...assignedUsers, userId];

    onUpdate({ binderAssignedUsers: newAssignedUsers });
  };

  const selectAll = () => {
    const allUserIds = allUsers.map(user => user.id).filter(id => id !== undefined);
    onUpdate({ binderAssignedUsers: allUserIds });
  };

  const selectNone = () => {
    onUpdate({ binderAssignedUsers: [] });
  };

  if (allUsers.length === 0) {
    return (
      <div className={cn("bg-warning-secondary/20 border border-warning-secondary rounded-lg p-4")}>
        <p className={cn("text-sm text-warning-text")}>
          No users available for assignment. Please complete the previous steps to create user accounts.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4")}>
      <div className={cn("flex items-center justify-between")}>
        <div className={cn("flex items-center gap-2")}>
          <UsersIcon className={cn("w-5 h-5 text-muted-foreground")} />
          <h3 className={cn("text-lg font-medium text-primary")}>
            Assign Binder to Users
          </h3>
        </div>
        <div className={cn("flex gap-2")}>
          <button
            type="button"
            onClick={selectAll}
            className={cn(
              "px-3 py-1 text-sm border rounded-md",
              "border-border text-muted-foreground hover:text-foreground hover:border-info-primary",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-info-primary focus:ring-offset-2"
            )}
          >
            Select All
          </button>
          <button
            type="button"
            onClick={selectNone}
            className={cn(
              "px-3 py-1 text-sm border rounded-md",
              "border-border text-muted-foreground hover:text-foreground hover:border-info-primary",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-info-primary focus:ring-offset-2"
            )}
          >
            Select None
          </button>
        </div>
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3")}>
        {allUsers.map((user) => {
          const userId = user.id || "";
          const isAssigned = assignedUsers.includes(userId);

          return (
            <button
              key={user.id}
              type="button"
              onClick={() => handleUserToggle(userId)}
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
        })}
      </div>

      <div className={cn("bg-info-secondary/20 border border-info-secondary rounded-lg p-4")}>
        <h4 className={cn("text-sm font-medium text-info-text mb-2")}>
          📋 User Assignment
        </h4>
        <ul className={cn("text-sm text-info-text space-y-1")}>
          <li>• Selected users will have access to this binder</li>
          <li>• Multiple users can share the same binder</li>
          <li>• You can modify assignments later in the app</li>
          <li>• {assignedUsers.length} of {allUsers.length} users selected</li>
        </ul>
      </div>
    </div>
  );
}
