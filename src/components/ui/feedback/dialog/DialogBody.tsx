import cn from "@/utils/cn";

export default function DialogBody({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={cn(className, "mt-6")} />;
}
