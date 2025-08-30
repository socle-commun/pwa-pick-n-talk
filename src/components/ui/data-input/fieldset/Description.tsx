import { Typography } from "@mui/material";

export default function Description({
  className,
  sx,
  ...props
}: { className?: string; sx?: any } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <Typography
      data-slot="description"
      variant="body2"
      color="text.secondary"
      {...props}
      className={className}
      sx={{
        fontSize: { xs: "1rem", sm: "0.875rem" },
        lineHeight: 1.5,
        "&[data-disabled]": {
          opacity: 0.5,
        },
        ...sx
      }}
    />
  );
}
