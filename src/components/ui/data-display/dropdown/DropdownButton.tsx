import { type ElementType } from "react";

import {
  type MenuButtonProps as HeadlessMenuButtonProps,
  MenuButton as HeadlessMenuButton
} from "@headlessui/react";

import Button from "@/components/ui/actions/Button";

export default function DropdownButton<T extends ElementType = typeof Button>({
  as = Button,
  ...props
}: { className?: string } & Omit<HeadlessMenuButtonProps<T>, "className">) {
  return <HeadlessMenuButton as={as} {...props} />
}