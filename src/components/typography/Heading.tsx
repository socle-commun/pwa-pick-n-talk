import cn from "@/utilities/cn"

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>

export default function Heading({ className, level = 1, ...props }: HeadingProps) {
  let Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(className, "text-2xl/8 font-semibold text-zinc-950 sm:text-xl/8 dark:text-white")}
    />
  )
}