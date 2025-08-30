import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface ListboxLabelProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLSpanElement, ListboxLabelProps>(
  function ListboxLabel({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="body2"
        component="span"
        sx={{
          marginLeft: 1,
          "&:first-of-type": {
            marginLeft: 0,
          },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
