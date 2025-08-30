import { MenuList, type MenuListProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownMenuProps extends Omit<MenuListProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLUListElement, DropdownMenuProps>(
  function DropdownMenu({ children, ...props }, ref) {
    return (
      <MenuList
        ref={ref}
        sx={{
          padding: 1,
          borderRadius: 2,
          minWidth: 180,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          border: (theme) =>
            `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
        }}
        {...props}
      >
        {children}
      </MenuList>
    );
  }
);
