import { DataInteractive } from "@headlessui/react";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
} from "react";
import { NavLink } from "react-router";


export default forwardRef(function Link(
  props: { href: string } & ComponentPropsWithoutRef<"a">,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <DataInteractive>
      <NavLink {...props} to={props.href} ref={ref} />
    </DataInteractive>
  );
});
