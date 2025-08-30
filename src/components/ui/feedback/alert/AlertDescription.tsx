import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface AlertDescriptionProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  function AlertDescription({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="body2"
        component="p"
        sx={{
          marginTop: 2,
          textAlign: { xs: "center", sm: "left" },
          color: (theme: any) => theme.palette.text.secondary,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
