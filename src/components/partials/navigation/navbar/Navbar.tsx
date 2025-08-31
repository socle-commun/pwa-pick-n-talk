import { AppBar, Toolbar } from "@mui/material";
import { type ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: 1,
        borderColor: "divider"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 2 },
          py: 1.25,
          minWidth: 0
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
}
