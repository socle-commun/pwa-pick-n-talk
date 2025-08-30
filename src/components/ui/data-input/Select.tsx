import { 
  Select as MuiSelect,
  FormControl,
  type SelectProps as MuiSelectProps
} from "@mui/material";
import { forwardRef, type ForwardedRef } from "react";

interface SelectProps extends Omit<MuiSelectProps, "variant"> {
  className?: string;
}

export default forwardRef(function Select(
  {
    className,
    children,
    sx,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <FormControl fullWidth size="small">
      <MuiSelect
        ref={ref}
        variant="outlined"
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
          ...sx
        }}
        className={className}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
});
