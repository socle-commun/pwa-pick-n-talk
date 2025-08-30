import { Typography } from "@mui/material";

export default function Legend({
  className,
  sx,
  ...props
}: { className?: string; sx?: any } & React.ComponentPropsWithoutRef<"legend">) {
  return (
    <Typography
      component="legend"
      data-slot="legend"
      variant="subtitle1"
      {...props}
      className={className}
      sx={{
        fontSize: { xs: '1rem', sm: '0.875rem' },
        lineHeight: 1.5,
        fontWeight: 600,
        color: 'text.primary',
        '&[data-disabled]': {
          opacity: 0.5,
        },
        ...sx
      }}
    />
  );
}
