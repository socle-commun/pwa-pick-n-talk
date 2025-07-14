import cn from "@/utils/cn";

export default function Code({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        className,
        "rounded-sm border border-zinc-950/10 bg-zinc-950/2.5 px-0.5 text-sm font-medium text-zinc-950 sm:text-[0.8125rem] dark:border-white/20 dark:bg-white/5 dark:text-white"
      )}
      {...props}
    />
  );
}
