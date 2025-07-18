import cn from "@/utils/cn";

export default function UserStepTips() {
  return (
    <div className={cn("bg-success-secondary/20 border border-success-secondary rounded-lg p-4")}>
      <h3 className={cn("text-sm font-medium text-success-text mb-2")}>
        👥 About User Accounts
      </h3>
      <ul className={cn("text-sm text-success-text space-y-1")}>
        <li>• Users can access assigned communication binders</li>
        <li>• Each user has personalized settings and preferences</li>
        <li>• Caregivers can assign multiple users to the same binder</li>
        <li>• Passwords are optional for simplified access</li>
      </ul>
    </div>
  );
}
