import cn from "@/utils/cn";

export default function Text({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="text"
      className={cn(
        className,
        "text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400",
      )}
      {...props}
    />
  );
}
