import cn from "@/utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  icon,
  className,
  action
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      {icon && (
        <div className={cn("text-4xl mb-4 text-zinc-400 dark:text-zinc-500")}>
          {icon}
        </div>
      )}
      <div className={cn("text-xl text-zinc-600 dark:text-zinc-400 mb-2 text-center")}>
        {title}
      </div>
      {description && (
        <div className={cn("text-sm text-zinc-500 dark:text-zinc-500 text-center")}>
          {description}
        </div>
      )}
      {action && (
        <div className={cn("mt-4")}>
          {action}
        </div>
      )}
    </div>
  );
}
