/**
 * MUI Button Component - Proof of Concept
 * 
 * This is a transitional component that bridges the gap between our existing Button API
 * and MUI's Button component while maintaining backward compatibility.
 */

import { forwardRef, type ForwardedRef } from "react";
import { Button as MuiButtonComponent, type ButtonProps as MuiButtonProps } from "@mui/material";
import { Link } from "@/components/ui/navigation";

// Import TouchTarget for now to maintain compatibility
import TouchTarget from "@/components/ui/actions/TouchTarget";

// Color mapping from our existing system to MUI
type Color = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray' | 'zinc' | 'dark/zinc';

const colorToMuiVariant = (color?: Color): MuiButtonProps['color'] => {
  switch (color) {
    case 'blue':
      return 'primary';
    case 'red':
      return 'error';
    case 'green':
      return 'success';
    case 'yellow':
    case 'purple':
      return 'secondary';
    case 'gray':
    case 'zinc':
    case 'dark/zinc':
    default:
      return 'primary';
  }
};

type ButtonProps = (
  | { color?: Color; outline?: never; plain?: never }
  | { color?: never; outline: true; plain?: never }
  | { color?: never; outline?: never; plain: true }
) & {
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
} & (
    | (Omit<MuiButtonProps, "color" | "variant" | "className"> & { href?: never })
    | (Omit<React.ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string })
  );

export default forwardRef<HTMLElement, ButtonProps>(function MuiButton(
  { color, outline, plain, className, children, ...props },
  ref
) {
  // Determine MUI variant based on our props
  const variant = outline ? 'outlined' : plain ? 'text' : 'contained';
  const muiColor = colorToMuiVariant(color);

  if ("href" in props && props.href) {
    return (
      <Link
        {...props}
        href={props.href}
        className={className}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
      >
        <TouchTarget>{children}</TouchTarget>
      </Link>
    );
  }

  return (
    <MuiButtonComponent
      {...(props as Omit<MuiButtonProps, "color" | "variant" | "className">)}
      variant={variant}
      color={muiColor}
      className={className}
      ref={ref as ForwardedRef<HTMLButtonElement>}
    >
      {children}
    </MuiButtonComponent>
  );
});