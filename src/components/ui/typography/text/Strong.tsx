import { Typography, type TypographyProps } from "@mui/material";

export default function Strong({
  children,
  sx,
  ...props
}: Omit<TypographyProps, "component" | "variant"> & React.ComponentPropsWithoutRef<"strong">) {
  return (
    <Typography
      component="strong"
      variant="inherit"
      sx={{
        fontWeight: 500,
        color: "text.primary",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
