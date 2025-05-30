import cn from "@/utilities/cn";

export default function ComboboxLabel({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) {
  return <span {...props} className={cn(className, 'ml-2.5 truncate first:ml-0 sm:ml-2 sm:first:ml-0')} />
}