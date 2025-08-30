import { Select, MenuItem, FormControl, type SelectProps } from "@mui/material";
import { forwardRef, type ReactNode, type ForwardedRef } from "react";

export interface ListboxProps<T> extends Omit<SelectProps<T>, "children"> {
  children?: ReactNode;
  placeholder?: string;
  "aria-label"?: string;
}

function ListboxInner<T>({
  children,
  placeholder,
  "aria-label": ariaLabel,
  ...props
}: ListboxProps<T>, ref: ForwardedRef<any>) {
  return (
    <FormControl fullWidth>
      <Select
        ref={ref}
        displayEmpty
        aria-label={ariaLabel}
        sx={{
          minHeight: 40,
          borderRadius: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.2)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: (theme) => theme.palette.primary.main,
          },
        }}
        {...props}
      >
        {placeholder && !props.value && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {children}
      </Select>
    </FormControl>
  );
}

export default forwardRef(ListboxInner) as <T>(props: ListboxProps<T> & { ref?: any }) => React.ReactElement;
