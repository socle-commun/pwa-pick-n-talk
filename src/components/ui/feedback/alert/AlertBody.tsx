import cn from "@/utils/cn";

export default function AlertBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn(className, "mt-4")} {...props} />;
}
