import { Box } from "@mui/material";
import { type ReactNode } from "react";

interface StackedLayoutProps {
  navbar?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

export default function StackedLayout({ navbar, sidebar, children }: StackedLayoutProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {navbar}
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {sidebar}
        <Box component="main" sx={{ flex: 1, overflow: "auto", p: 2 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
