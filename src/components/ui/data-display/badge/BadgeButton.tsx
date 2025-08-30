import { Chip, IconButton } from "@mui/material";
import React, { forwardRef } from "react";
import { Link } from "@/components/ui/navigation";

const colorMap = {
  red: 'error',
  orange: 'warning', 
  amber: 'warning',
  yellow: 'warning',
  lime: 'success',
  green: 'success',
  emerald: 'success',
  teal: 'info',
  cyan: 'info',
  sky: 'info',
  blue: 'primary',
  indigo: 'primary',
  violet: 'secondary',
  purple: 'secondary',
  fuchsia: 'secondary',
  pink: 'secondary',
  rose: 'error',
  zinc: 'default',
} as const;

type BadgeButtonProps = { 
  color?: keyof typeof colorMap;
  className?: string; 
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  sx?: any;
};

export default forwardRef(function BadgeButton(
  {
    color = "zinc",
    className,
    children,
    href,
    onClick,
    sx,
    ...props
  }: BadgeButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const baseStyles = {
    borderRadius: 1.5,
    fontSize: { xs: '0.75rem', sm: '0.625rem' },
    height: 'auto',
    px: 0.75,
    py: 0.25,
    fontWeight: 500,
    '&:focus': {
      outline: 2,
      outlineOffset: 2,
      outlineColor: 'primary.main',
    },
    ...sx
  };

  if (href) {
    return (
      <Chip
        component={Link}
        href={href}
        size="small"
        variant="filled"
        color={colorMap[color] as any}
        label={children}
        className={className}
        clickable
        sx={baseStyles}
        {...props}
        ref={ref}
      />
    );
  }

  return (
    <Chip
      size="small"
      variant="filled"
      color={colorMap[color] as any}
      label={children}
      className={className}
      clickable={!!onClick}
      onClick={onClick}
      sx={baseStyles}
      {...props}
      ref={ref}
    />
  );
});
