import cn from "@/utilities/cn"

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>

export default function Subheading({ className, level = 2, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(className, "text-base/7 font-semibold text-zinc-950 sm:text-sm/6 dark:text-white")}
    />
  )
}