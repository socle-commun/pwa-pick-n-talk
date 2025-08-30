import { MenuItem, type MenuItemProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface DropdownItemProps extends Omit<MenuItemProps, "children"> {
  children?: ReactNode;
  href?: string;
}

export default forwardRef<HTMLLIElement, DropdownItemProps>(
  function DropdownItem({ children, href, ...props }, ref) {
    return (
      <MenuItem
        ref={ref}
        component={href ? "a" : "button"}
        href={href}
        sx={{
          borderRadius: 1.5,
          margin: "2px",
          minHeight: 40,
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
          },
          "&:focus": {
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
          },
        }}
        {...props}
      >
        {children}
      </MenuItem>
    );
  }
);
