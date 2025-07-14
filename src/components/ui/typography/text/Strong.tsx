import cn from "@/utils/cn";

export default function Strong({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn(className, "font-medium text-zinc-950 dark:text-white")}
      {...props}
    />
  );
}
