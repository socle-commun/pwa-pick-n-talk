import cn from "@/utils/cn";

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
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)}>
      <div className={cn("text-red-600 dark:text-red-400 text-xl mb-2")}>
        ⚠️ {title}
      </div>
      {description && (
        <div className={cn("text-zinc-600 dark:text-zinc-400 text-center")}>
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
