import cn from "@/utilities/cn";

export function AlertBody({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn(className, "mt-4")} {...props} />
}
