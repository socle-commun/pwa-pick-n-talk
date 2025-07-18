import cn from "@/utils/cn";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function UserStepHeader() {
  return (
    <div className={cn("text-center mb-8")}>
      <div className={cn("w-16 h-16 bg-success-primary rounded-full flex items-center justify-center mx-auto mb-4")}>
        <UsersIcon className={cn("w-8 h-8 text-white")} />
      </div>
      <h2 className={cn("text-2xl font-bold text-primary mb-2")}>
        Create User Accounts
      </h2>
      <p className={cn("text-muted-foreground")}>
        Add users who will use the communication binders. Each user can have their own personalized experience.
      </p>
    </div>
  );
}
