import { Divider, type DividerProps } from "@mui/material";
import { forwardRef } from "react";

export interface NavbarDividerProps extends DividerProps {}

export default forwardRef<HTMLHRElement, NavbarDividerProps>(
  function NavbarDivider(props, ref) {
    return (
      <Divider
        ref={ref}
        orientation="vertical"
        aria-hidden="true"
        sx={{
          height: 24,
          backgroundColor: (theme: any) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
        }}
        {...props}
      />
    );
  }
);
