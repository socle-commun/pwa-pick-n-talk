import {
  type DescriptionProps as HeadlessDescriptionProps,
  Description as HeadlessDescription,
} from "@headlessui/react";

import cn from "@/utilities/cn";

export default function DropdownShortcut({
  keys,
  className,
  ...props
}: { keys: string | string[]; className?: string } & Omit<HeadlessDescriptionProps<"kbd">, "as" | "className">) {
  return (
    <HeadlessDescription as="kbd" {...props} className={cn(className, "col-start-5 row-start-1 flex justify-self-end")}>
      {(Array.isArray(keys) ? keys : keys.split("")).map((char, index) => (
        <kbd
          key={index}
          className={cn([
            "min-w-[2ch] text-center font-sans text-zinc-400 capitalize group-data-focus:text-white forced-colors:group-data-focus:text-[HighlightText]",
            // Make sure key names that are longer than one character (like "Tab") have extra space
            index > 0 && char.length > 1 && "pl-1",
          ])}
        >
          {char}
        </kbd>
      ))}
    </HeadlessDescription>
  );
}
