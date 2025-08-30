import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownHeadingProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLSpanElement, DropdownHeadingProps>(
  function DropdownHeading({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="caption"
        component="span"
        sx={{
          fontWeight: 600,
          color: (theme) => theme.palette.text.secondary,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          padding: "8px 12px 4px",
          display: "block",
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
