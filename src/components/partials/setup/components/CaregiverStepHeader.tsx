import cn from "@/utils/cn";
import { UserPlusIcon } from "@heroicons/react/24/outline";

export default function CaregiverStepHeader() {
  return (
    <div className={cn("text-center mb-8")}>
      <div className={cn("w-16 h-16 bg-info-primary rounded-full flex items-center justify-center mx-auto mb-4")}>
        <UserPlusIcon className={cn("w-8 h-8 text-white")} />
      </div>
      <h2 className={cn("text-2xl font-bold text-primary mb-2")}>
        Create Main Caregiver Account
      </h2>
      <p className={cn("text-muted-foreground")}>
        Set up the primary caregiver account that will manage users and binders.
      </p>
    </div>
  );
}
