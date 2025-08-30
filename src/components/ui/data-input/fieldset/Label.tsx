import { InputLabel, type InputLabelProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface LabelProps extends Omit<InputLabelProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ children, ...props }, ref) {
    return (
      <InputLabel
        ref={ref}
        sx={{
          fontSize: { xs: "1rem", sm: "0.875rem" },
          lineHeight: 1.5,
          userSelect: "none",
          "&.Mui-disabled": {
            opacity: 0.5,
          },
        }}
        {...props}
      >
        {children}
      </InputLabel>
    );
  }
);
