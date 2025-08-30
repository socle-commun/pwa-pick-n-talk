import { Box } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

export default function SidebarSpacer({
  className,
  sx,
  ...props
}: ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  return (
    <Box
      aria-hidden="true"
      {...props}
      className={className}
      sx={{
        mt: 4,
        flex: 1,
        ...sx
      }}
    />
  );
}
