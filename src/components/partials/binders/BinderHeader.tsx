import cn from "@/utils/cn";

interface BinderHeaderProps {
  title: string;
  description?: string;
}

export function BinderHeader({ title, description }: BinderHeaderProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 p-6"
      )}
    >
      <h1 className={cn("text-3xl font-bold text-zinc-900 dark:text-zinc-100")}>
        {title}
      </h1>
      {description && (
        <p className={cn("mt-2 text-zinc-600 dark:text-zinc-400")}>
          {description}
        </p>
      )}
    </div>
  );
}
