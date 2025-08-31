export interface ErrorFallbackProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function ErrorFallback({
  title,
  description,
  className,
  action
}: ErrorFallbackProps) {
  const containerBaseClasses = "flex flex-col items-center justify-center p-8";
  const containerClasses = className ? `${containerBaseClasses} ${className}` : containerBaseClasses;

  const titleClasses = "text-red-600 dark:text-red-400 text-xl mb-2";
  const descriptionClasses = "text-zinc-600 dark:text-zinc-400 text-center";
  const actionClasses = "mt-4";

  return (
    <div className={containerClasses}>
      <div className={titleClasses}>
        ⚠️ {title}
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
