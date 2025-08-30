import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownDescriptionProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLSpanElement, DropdownDescriptionProps>(
  function DropdownDescription({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="caption"
        component="span"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          display: "block",
          marginTop: 0.5,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
