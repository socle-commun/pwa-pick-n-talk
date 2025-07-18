import cn from "@/utils/cn";

export default function CaregiverStepTips() {
  return (
    <div className={cn("bg-info-secondary/20 border border-info-secondary rounded-lg p-4")}>
      <h3 className={cn("text-sm font-medium text-info-text mb-2")}>
        💡 About Caregiver Accounts
      </h3>
      <ul className={cn("text-sm text-info-text space-y-1")}>
        <li>• Can create and manage user accounts</li>
        <li>• Can assign binders to multiple users</li>
        <li>• Has access to all communication features</li>
        <li>• Password is optional for enhanced security</li>
      </ul>
    </div>
  );
}
