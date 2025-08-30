import {
  Drawer,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useState, type PropsWithChildren, type ReactNode } from "react";

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
        display: { lg: 'none' },
        '& .MuiDrawer-paper': {
          width: 320,
          maxWidth: '80vw',
          p: 1,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          borderRadius: 2,
          backgroundColor: 'background.paper',
          boxShadow: 3,
          border: 1,
          borderColor: 'divider',
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

export default function SidebarLayout({
  navbar,
  sidebar,
  children,
}: PropsWithChildren<{ navbar: ReactNode; sidebar: ReactNode }>) {
  const [showSidebar, setShowSidebar] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: { xs: 'background.paper', lg: 'background.default' },
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      {/* Sidebar on desktop */}
      {isLargeScreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            width: 256,
          }}
        >
          {sidebar}
        </Box>
      )}

      {/* Sidebar on mobile */}
      <MobileSidebar open={showSidebar} close={() => setShowSidebar(false)}>
        {sidebar}
      </MobileSidebar>

      {/* Navbar on mobile */}
      <Box
        component="header"
        sx={{
          display: { lg: 'none' },
          alignItems: 'center',
          px: 2,
        }}
      >
        <Box sx={{ py: 1.25 }}>
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
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          pb: 1,
          pl: { lg: '256px' },
          pt: { lg: 1 },
          pr: { lg: 1 },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 3, lg: 5 },
            borderRadius: { lg: 2 },
            backgroundColor: { lg: 'background.paper' },
            boxShadow: { lg: 1 },
            border: { lg: 1 },
            borderColor: { lg: 'divider' },
          }}
        >
          <Box sx={{ mx: 'auto', maxWidth: '72rem' }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
