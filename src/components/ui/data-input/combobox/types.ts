import { type ComboboxProps as HeadlessComboboxProps } from "@headlessui/react";
import { type ReactElement } from "react";

export interface ComboboxProps<T> {
  options: T[];
  displayValue: (value: T | null) => string | undefined;
  filter?: (value: T, query: string) => boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  children: (value: NonNullable<T>) => ReactElement;
  anchor?: "top" | "bottom";
}

export type ComboboxComponentProps<T> = ComboboxProps<T> &
  Omit<HeadlessComboboxProps<T, false>, "as" | "multiple" | "children">;
