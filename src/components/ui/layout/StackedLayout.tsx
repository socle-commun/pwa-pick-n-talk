import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  Box,
  // useTheme, // TODO: For responsive sidebar
  // useMediaQuery, // TODO: For responsive sidebar
} from "@mui/material";
import { useState, type PropsWithChildren } from "react";

function MobileSidebar({
  open,
  close,
  children,
}: PropsWithChildren<{ open: boolean; close: () => void }>) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      sx={{
        display: { lg: "none" },
        "& .MuiDrawer-paper": {
          width: 320,
          maxWidth: "80vw",
          p: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          borderRadius: 2,
          backgroundColor: "background.paper",
          boxShadow: 3,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ px: 2, pt: 1.5, mb: -1.5 }}>
          <IconButton
            onClick={close}
            aria-label="Close navigation"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
}

export default function StackedLayout({
  navbar,
  sidebar,
  children,
}: PropsWithChildren<{ navbar: React.ReactNode; sidebar: React.ReactNode }>) {
  const [showSidebar, setShowSidebar] = useState(false);
  // const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // TODO: Use for responsive sidebar

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar */}
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box sx={{ py: 1.25, display: { lg: "none" } }}>
          <IconButton
            onClick={() => setShowSidebar(true)}
            aria-label="Open navigation"
            size="small"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>{navbar}</Box>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { lg: 1 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 3, lg: 0 },
            borderRadius: { lg: 2 },
            border: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ mx: "auto", maxWidth: "72rem" }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
