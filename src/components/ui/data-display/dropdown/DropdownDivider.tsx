import { Divider, type DividerProps } from "@mui/material";
import { forwardRef } from "react";

export interface DropdownDividerProps extends DividerProps {}

export default forwardRef<HTMLHRElement, DropdownDividerProps>(
  function DropdownDivider(props, ref) {
    return (
      <Divider
        ref={ref}
        sx={{
          margin: "4px 8px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.08)",
        }}
        {...props}
      />
    );
  }
);
