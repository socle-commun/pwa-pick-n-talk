import { type ComponentPropsWithoutRef } from "react";
import { Box } from "@mui/material";

export default function SidebarHeader({
  className,
  sx,
  ...props
}: ComponentPropsWithoutRef<"div"> & { sx?: any }) {
  return (
    <Box
      {...props}
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderBottom: 1,
        borderColor: 'divider',
        p: 2,
        '& > * + *': {
          mt: 1.25,
        },
        ...sx
      }}
    />
  );
}
