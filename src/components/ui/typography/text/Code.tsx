import { Typography, type TypographyProps } from "@mui/material";

export default function Code({
  children,
  sx,
  ...props
}: Omit<TypographyProps, "component" | "variant"> & React.ComponentPropsWithoutRef<"code">) {
  return (
    <Typography
      component="code"
      variant="body2"
      sx={{
        fontFamily: "monospace",
        fontSize: "0.875rem",
        fontWeight: 500,
        backgroundColor: "action.hover",
        color: "text.primary",
        px: 0.5,
        py: 0.25,
        borderRadius: 0.5,
        border: "1px solid",
        borderColor: "divider",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
