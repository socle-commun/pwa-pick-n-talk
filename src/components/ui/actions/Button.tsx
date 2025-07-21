import { forwardRef, type ForwardedRef } from "react";

import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

import TouchTarget from "@/components/ui/actions/TouchTarget";
import { Link } from "@/components/ui/navigation";

import cn from "@/utils/cn";
import { styles, type Color } from "./button.styles";

type ButtonProps = (
  | { color?: Color; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & {
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
} & (
    | Omit<HeadlessButtonProps, "as" | "className">
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "className">
  );

export default forwardRef(function Button(
  { color, outline, plain, className, children, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLElement>
) {
  const getButtonVariant = () => {
    if (outline) return styles.outline;
    if (plain) return styles.plain;
    return cn(styles.solid, styles.colors[color ?? "dark/zinc"]);
  };

  const classes = cn(
    styles.base,
    className,
    getButtonVariant()
  );

  return "href" in props ? (
    <Link
      {...props}
      className={classes}
      ref={ref as ForwardedRef<HTMLAnchorElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </Link>
  ) : (
    <HeadlessButton
      {...props}
      className={cn(classes, "cursor-pointer")}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      <TouchTarget>{children}</TouchTarget>
    </HeadlessButton>
  );
});

