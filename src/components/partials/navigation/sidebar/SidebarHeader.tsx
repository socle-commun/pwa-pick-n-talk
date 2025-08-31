import { Box } from "@mui/material";
import { type ReactNode } from "react";

interface SidebarHeaderProps {
  children: ReactNode;
}

export default function SidebarHeader({ children }: SidebarHeaderProps) {
  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
      {children}
    </Box>
  );
}
