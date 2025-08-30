import { Typography } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

export default function SidebarLabel({
  className,
  sx,
  ...props
}: ComponentPropsWithoutRef<"span"> & { sx?: any }) {
  return (
    <Typography
      component="span"
      {...props}
      className={className}
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        ...sx
      }}
    />
  );
}
