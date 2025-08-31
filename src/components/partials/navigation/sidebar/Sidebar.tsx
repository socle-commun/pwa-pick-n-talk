import { Box } from "@mui/material";
import { type ComponentPropsWithoutRef } from "react";

export default function Sidebar({
  sx,
  ...props
}: ComponentPropsWithoutRef<"nav"> & { sx?: any }) {
  return (
    <Box
      component="nav"
      {...props}
      sx={{
        display: "flex",
        height: "100%",
        minHeight: 0,
        flexDirection: "column",
        ...sx
      }}
    />
  );
}
