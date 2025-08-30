import { MenuItem, type MenuItemProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";
import { Check as CheckIcon } from "@mui/icons-material";

export interface ListboxOptionProps extends Omit<MenuItemProps, "children" | "value"> {
  children?: ReactNode;
  value: any;
  selected?: boolean;
}

export default forwardRef<HTMLLIElement, ListboxOptionProps>(
  function ListboxOption({ children, value, selected, ...props }, ref) {
    return (
      <MenuItem
        ref={ref}
        value={value}
        selected={selected}
        sx={{
          borderRadius: 1.5,
          margin: "2px",
          minHeight: 40,
          display: "flex",
          alignItems: "center",
          gap: 1,
          "&:hover": {
            backgroundColor: (theme: any) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
          },
          "&.Mui-selected": {
            backgroundColor: (theme: any) => theme.palette.primary.main,
            color: (theme: any) => theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: (theme: any) => theme.palette.primary.dark,
            },
          },
        }}
        {...props}
      >
        {selected && (
          <CheckIcon 
            sx={{ 
              fontSize: 16, 
              marginRight: 0.5,
              color: (theme: any) => 
                selected ? theme.palette.primary.contrastText : theme.palette.text.secondary
            }} 
          />
        )}
        {children}
      </MenuItem>
    );
  }
);
