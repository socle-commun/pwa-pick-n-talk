import { Box, type BoxProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownHeaderProps extends Omit<BoxProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLDivElement, DropdownHeaderProps>(
  function DropdownHeader({ children, ...props }, ref) {
    return (
      <Box
        ref={ref}
        component="div"
        sx={{
          padding: "10px 14px 4px",
          borderBottom: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
          marginBottom: 1,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);
