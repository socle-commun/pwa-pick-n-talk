export interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "Loading...",
  className,
  size = "md"
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const containerBaseClasses = "flex items-center justify-center p-8";
  const containerClasses = className ? `${containerBaseClasses} ${className}` : containerBaseClasses;

  const textClasses = "text-zinc-600 dark:text-zinc-400 flex items-center gap-2";
  const spinnerBaseClasses = "animate-spin border-2 border-blue-600 border-t-transparent rounded-full";
  const spinnerClasses = `${spinnerBaseClasses} ${sizeClasses[size]}`;

  return (
    <div className={containerClasses}>
      <div className={textClasses}>
        <div
          className={spinnerClasses}
          role="status"
          aria-hidden="true"
        />
        {message}
      </div>
    </div>
  );
}
