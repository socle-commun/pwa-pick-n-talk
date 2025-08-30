import { DialogTitle, type DialogTitleProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface AlertTitleProps extends Omit<DialogTitleProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLHeadingElement, AlertTitleProps>(
  function AlertTitle({ children, ...props }, ref) {
    return (
      <DialogTitle
        ref={ref}
        sx={{
          textAlign: { xs: "center", sm: "left" },
          fontSize: { xs: "1rem", sm: "0.875rem" },
          fontWeight: 600,
          lineHeight: 1.5,
          color: (theme: any) => theme.palette.text.primary,
        }}
        {...props}
      >
        {children}
      </DialogTitle>
    );
  }
);
