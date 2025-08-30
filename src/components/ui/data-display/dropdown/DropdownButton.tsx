import { IconButton, type IconButtonProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownButtonProps extends Omit<IconButtonProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLButtonElement, DropdownButtonProps>(
  function DropdownButton({ children, ...props }, ref) {
    return (
      <IconButton
        ref={ref}
        size="small"
        sx={{
          borderRadius: 2,
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
          },
        }}
        {...props}
      >
        {children}
      </IconButton>
    );
  }
);
