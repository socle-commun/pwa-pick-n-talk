import { TextField, type TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export interface TextareaProps extends Omit<TextFieldProps, "multiline"> {
  resizable?: boolean;
}

export default forwardRef<HTMLDivElement, TextareaProps>(
  function Textarea({ resizable = true, ...props }, ref) {
    return (
      <TextField
        ref={ref}
        multiline
        minRows={3}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme: any) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme: any) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme: any) => theme.palette.primary.main,
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme: any) => theme.palette.error.main,
            },
          },
          "& .MuiInputBase-input": {
            resize: resizable ? "vertical" : "none",
          },
        }}
        {...props}
      />
    );
  }
);
