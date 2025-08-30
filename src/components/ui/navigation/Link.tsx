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
    <NavLink {...props} to={props.href} ref={ref} />
  );
});
