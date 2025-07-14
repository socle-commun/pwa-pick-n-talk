import { type ComponentPropsWithoutRef } from "react";

import cn from "@/utils/cn";

type AvatarProps = {
  src?: string | null
  square?: boolean
  initials?: string
  alt?: string
  className?: string
}

export default function Avatar({
  src = null,
  square = false,
  initials,
  alt = "",
  className,
  ...props
}: AvatarProps & ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="avatar"
      {...props}
      className={cn(
        className,
        // Basic layout
        "inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1",
        "outline -outline-offset-1 outline-black/10 dark:outline-white/10",
        // Border radius
        square ? "rounded-(--avatar-radius) *:rounded-(--avatar-radius)" : "rounded-full *:rounded-full"
      )}
    >
      {initials && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
          viewBox="0 0 100 100"
        // aria-hidden={alt ? "false" : "true"}
        >
          {alt && <title>{alt}</title>}
          <text x="50%" y="50%" alignmentBaseline="middle" dominantBaseline="middle" textAnchor="middle" dy=".125em">
            {initials}
          </text>
        </svg>
      )}
      {src && <img className="size-full" src={src} alt={alt} />}
    </span>
  )
}