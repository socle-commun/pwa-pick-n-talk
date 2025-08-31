import { Box, Typography } from "@mui/material";

import Logo from "@/components/partials/global/Logo";

export default function Brand() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
      <Box sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 }, flexShrink: 0 }}>
        <Logo sx={{ width: "100%", height: "100%" }} />
      </Box>
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontFamily: "var(--font-logo)",
          fontSize: { xs: "1.125rem", sm: "1.5rem" },
          fontWeight: "bold",
          color: "text.primary",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        Pick'n'Talk
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {__APP_VERSION__}
      </Typography>
    </Box>
  );
}
