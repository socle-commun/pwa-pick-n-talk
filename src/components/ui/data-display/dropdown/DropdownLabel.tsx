import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownLabelProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLSpanElement, DropdownLabelProps>(
  function DropdownLabel({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="body2"
        component="span"
        sx={{
          fontWeight: 500,
          color: (theme) => theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
