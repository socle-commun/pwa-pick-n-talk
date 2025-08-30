import { Box, type BoxProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface FieldsetProps extends Omit<BoxProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset({ children, ...props }, ref) {
    return (
      <Box
        ref={ref}
        component="fieldset"
        sx={{
          border: "none",
          padding: 0,
          margin: 0,
          "& > *:not(:first-of-type)": {
            marginTop: 3,
          },
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
