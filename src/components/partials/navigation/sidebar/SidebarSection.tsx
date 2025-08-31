import { Box } from "@mui/material";
import { type ReactNode } from "react";

interface SidebarSectionProps {
  children: ReactNode;
}

export default function SidebarSection({ children }: SidebarSectionProps) {
  return (
    <Box sx={{ p: 1 }}>
      {children}
    </Box>
  );
}
