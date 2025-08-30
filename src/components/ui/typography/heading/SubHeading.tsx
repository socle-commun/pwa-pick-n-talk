import { Typography, type TypographyProps } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & Omit<TypographyProps, "variant"> & ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;

export default function Subheading({
  level = 2,
  children,
  sx,
  ...props
}: HeadingProps) {
  const variant = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Typography
      variant={variant}
      component={variant}
      sx={{
        fontWeight: 400,
        color: "text.primary",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
