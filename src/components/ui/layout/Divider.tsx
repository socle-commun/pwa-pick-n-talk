import { type ComponentPropsWithoutRef } from "react";

export default function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & ComponentPropsWithoutRef<"hr">) {
  const baseClasses = "w-full border-t";
  const softClasses = soft
    ? "border-zinc-950/5 dark:border-white/5"
    : "border-zinc-950/10 dark:border-white/10";

  const combinedClasses = [baseClasses, softClasses, className]
    .filter(Boolean)
    .join(" ");

  return (
    <hr
      role="presentation"
      {...props}
      className={combinedClasses}
    />
  );
}
