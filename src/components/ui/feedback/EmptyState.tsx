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
  const containerBaseClasses = "flex flex-col items-center justify-center p-8";
  const containerClasses = className ? `${containerBaseClasses} ${className}` : containerBaseClasses;

  const iconClasses = "text-4xl mb-4 text-zinc-400 dark:text-zinc-500";
  const titleClasses = "text-xl text-zinc-600 dark:text-zinc-400 mb-2 text-center";
  const descriptionClasses = "text-sm text-zinc-500 dark:text-zinc-500 text-center";
  const actionClasses = "mt-4";

  return (
    <div className={containerClasses}>
      {icon && (
        <div className={iconClasses}>
          {icon}
        </div>
      )}
      <div className={titleClasses}>
        {title}
      </div>
      {description && (
        <div className={descriptionClasses}>
          {description}
        </div>
      )}
      {action && (
        <div className={actionClasses}>
          {action}
        </div>
      )}
    </div>
  );
}
