import Link from "@/components/ui/navigation/Link";
import cn from "@/utils/cn";

export default function TextLink({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-hover:decoration-zinc-950 dark:text-white dark:decoration-white/50 dark:data-hover:decoration-white"
      )}
      {...props}
    />
  );
}
