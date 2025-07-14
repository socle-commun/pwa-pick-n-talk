import { useState } from "react";

import {
  Combobox as HeadlessCombobox,
  ComboboxInput as HeadlessComboboxInput,
  ComboboxButton as HeadlessComboboxButton,
  ComboboxOptions as HeadlessComboboxOptions,
} from "@headlessui/react";

import { type ComboboxComponentProps } from "./types";
import { controlStyles, inputStyles, optionsStyles } from "./helpers/styles";

export default function Combobox<T>({
  options,
  displayValue,
  filter,
  anchor = "bottom",
  className,
  placeholder,
  autoFocus,
  "aria-label": ariaLabel,
  children,
  ...props
}: ComboboxComponentProps<T>) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          filter
            ? filter(option, query)
            : displayValue(option)?.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <HeadlessCombobox
      {...props}
      multiple={false}
      virtual={{ options: filteredOptions }}
      onClose={() => setQuery("")}
    >
      <span
        data-slot="control"
        className={controlStyles(className)}
      >
        <HeadlessComboboxInput
          autoFocus={autoFocus}
          data-slot="control"
          aria-label={ariaLabel}
          displayValue={(option: T) => displayValue(option) ?? ""}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className={inputStyles(className)}
        />
        <HeadlessComboboxButton className="group absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 group-data-hover:stroke-zinc-700 sm:size-4 dark:stroke-zinc-400 dark:group-data-hover:stroke-zinc-300 forced-colors:stroke-[CanvasText]"
            viewBox="0 0 16 16"
            aria-hidden="true"
            fill="none"
          >
            <path
              d="M5.75 10.75L8 13L10.25 10.75"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.25 5.25L8 3L5.75 5.25"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </HeadlessComboboxButton>
      </span>
      <HeadlessComboboxOptions
        transition
        anchor={anchor}
        className={optionsStyles}
      >
        {({ option }) => children(option)}
      </HeadlessComboboxOptions>
    </HeadlessCombobox>
  );
}
