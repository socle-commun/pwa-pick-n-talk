import { Typography, type TypographyProps } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

export interface SidebarHeadingProps extends Omit<TypographyProps, "children"> {
  children?: ReactNode;
}

export default forwardRef<HTMLHeadingElement, SidebarHeadingProps>(
  function SidebarHeading({ children, ...props }, ref) {
    return (
      <Typography
        ref={ref}
        variant="caption"
        component="h3"
        sx={{
          marginBottom: 1,
          paddingX: 2,
          fontWeight: 600,
          color: (theme: any) => theme.palette.text.secondary,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);
