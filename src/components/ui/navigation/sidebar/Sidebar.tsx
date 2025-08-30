import { type ComponentPropsWithoutRef } from "react";
import { Box } from "@mui/material";

export default function Sidebar({
  className,
  sx,
  ...props
}: ComponentPropsWithoutRef<"nav"> & { sx?: any }) {
  return (
    <Box 
      component="nav" 
      {...props} 
      className={className}
      sx={{
        display: 'flex',
        height: '100%',
        minHeight: 0,
        flexDirection: 'column',
        ...sx
      }}
    />
  );
}
