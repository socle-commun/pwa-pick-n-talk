import cn from "@/utilities/cn";

export default function DialogBody({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div {...props} className={cn(className, "mt-6")} />;
}
