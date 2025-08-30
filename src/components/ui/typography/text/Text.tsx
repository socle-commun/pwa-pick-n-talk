import { Typography, type TypographyProps } from "@mui/material";

type TextProps = TypographyProps<"p", { component?: "p" }>;

export default function Text({
  children,
  sx,
  ...props
}: TextProps) {
  return (
    <Typography
      component="p"
      variant="body1"
      sx={{
        color: "text.secondary",
        lineHeight: 1.5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
