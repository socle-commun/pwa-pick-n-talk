import { Chip } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

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

type BadgeProps = { 
  color?: keyof typeof colorMap;
  sx?: any;
  children?: React.ReactNode;
};

export default function Badge({
  color = "zinc",
  className,
  sx,
  children,
  ...props
}: BadgeProps & ComponentPropsWithoutRef<"span">) {
  return (
    <Chip
      size="small"
      variant="filled"
      color={colorMap[color] as any}
      label={children}
      className={className}
      sx={{
        fontSize: { xs: '0.75rem', sm: '0.625rem' },
        height: 'auto',
        px: 0.75,
        py: 0.25,
        fontWeight: 500,
        ...sx
      }}
      {...props}
    />
  );
}
