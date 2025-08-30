import { Box, type BoxProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownSectionProps extends Omit<BoxProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLDivElement, DropdownSectionProps>(
  function DropdownSection({ children, ...props }, ref) {
    return (
      <Box
        ref={ref}
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          padding: "4px 0",
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
