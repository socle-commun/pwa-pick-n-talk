import { Chip, type ChipProps } from "@mui/material";
import { forwardRef } from "react";

export interface DropdownShortcutProps extends Omit<ChipProps, "label"> {
  keys: string | string[];
}

export default forwardRef<HTMLDivElement, DropdownShortcutProps>(
  function DropdownShortcut({ keys, ...props }, ref) {
    const keyString = Array.isArray(keys) ? keys.join("+") : keys;
    
    return (
      <Chip
        ref={ref}
        label={keyString}
        size="small"
        sx={{
          height: 20,
          fontSize: "0.7rem",
          fontFamily: "monospace",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.08)",
          color: (theme) => theme.palette.text.secondary,
          marginLeft: "auto",
        }}
        {...props}
      />
    );
  }
);
