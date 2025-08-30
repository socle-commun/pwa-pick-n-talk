import { Box } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

export default function NavbarSection({
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
        alignItems: 'center',
        gap: { xs: 1, sm: 3 },
        minWidth: 0,
        ...sx
      }}
    />
  );
}
