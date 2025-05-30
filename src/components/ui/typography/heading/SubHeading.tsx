import { type ComponentPropsWithoutRef } from "react"

import cn from "@/utilities/cn"

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>

export default function Subheading({ className, level = 2, ...props }: HeadingProps) {
  const Element: `h${typeof level}` = `h${level}`

  return (
    <Element
      {...props}
      className={cn(className, "text-2xl font-normal")}
    />
  )
}
