import cn from "@/utils/cn";

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

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className={cn("text-zinc-600 dark:text-zinc-400 flex items-center gap-2")}>
        <div
          className={cn(
            "animate-spin border-2 border-blue-600 border-t-transparent rounded-full",
            sizeClasses[size]
          )}
          role="status"
          aria-hidden="true"
        />
        {message}
      </div>
    </div>
  );
}
