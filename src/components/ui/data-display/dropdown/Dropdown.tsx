import { Menu, type MenuProps } from "@mui/material";
import { forwardRef } from "react";

export interface DropdownProps extends Omit<MenuProps, "open"> {
  open?: boolean;
}

export default forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { children, ...props },
  ref
) {
  return (
    <Menu
      ref={ref}
      open={props.open || false}
      slotProps={{
        paper: {
          sx: {
            minWidth: 180,
            borderRadius: 2,
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: (theme) =>
              `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)"
              }`,
          },
        },
      }}
      {...props}
    >
      {children}
    </Menu>
  );
});
