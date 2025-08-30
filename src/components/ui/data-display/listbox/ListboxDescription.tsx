import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface ListboxDescriptionProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLSpanElement, ListboxDescriptionProps>(
  function ListboxDescription({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="caption"
        component="span"
        sx={{
          color: (theme: any) => theme.palette.text.secondary,
          display: "block",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginTop: 0.5,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
