import { type MenuProps as HeadlessMenuProps, Menu as HeadlessMenu } from "@headlessui/react";

export default function Dropdown(props: HeadlessMenuProps) {
  return <HeadlessMenu {...props} />;
}
