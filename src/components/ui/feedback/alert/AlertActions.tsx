import cn from "@/utils/cn";

export default function AlertActions({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={cn(
        className,
        "mt-6 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:mt-4 sm:flex-row sm:*:w-auto"
      )}
    />
  )
}