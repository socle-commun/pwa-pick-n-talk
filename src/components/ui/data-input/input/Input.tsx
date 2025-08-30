import { 
  TextField,
  type TextFieldProps
} from "@mui/material";
import { forwardRef, type ForwardedRef } from "react";

const dateTypes = ["date", "datetime-local", "month", "time", "week"];
type DateType = (typeof dateTypes)[number];

interface InputProps extends Omit<TextFieldProps, "variant"> {
  className?: string;
  type?:
    | "email"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url"
    | DateType;
}

export default forwardRef(function Input(
  {
    className,
    sx,
    ...props
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <TextField
      ref={ref}
      variant="outlined"
      size="small"
      fullWidth
      {...props}
      className={className}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...sx
      }}
    />
  );
});
