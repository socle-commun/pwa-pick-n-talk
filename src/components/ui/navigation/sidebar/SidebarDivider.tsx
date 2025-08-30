import { Divider } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

export default function SidebarDivider({
  className,
  sx,
  ...props
}: ComponentPropsWithoutRef<"hr"> & { sx?: any }) {
  return (
    <Divider
      {...props}
      className={className}
      sx={{
        my: 2,
        mx: { lg: -2 },
        borderColor: "divider",
        ...sx
      }}
    />
  );
}
