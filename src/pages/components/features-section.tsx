/**
 * Features section component for the homepage
 * Displays the main features of the application
 */

import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <Box component="section" id="features" sx={{ py: 16 }}>
      <Box sx={{ textAlign: "center", mb: 12 }}>
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          {t("homepage.features.title")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        {/* Customizable Feature */}
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              mx: "auto",
              mb: 2,
              bgcolor: "primary.main",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="svg"
              sx={{ width: 24, height: 24, color: "primary.contrastText" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </Box>
          </Box>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            {t("homepage.features.items.customizable.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("homepage.features.items.customizable.description")}
          </Typography>
        </Box>

        {/* Accessible Feature */}
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              mx: "auto",
              mb: 2,
              bgcolor: "success.main",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="svg"
              sx={{ width: 24, height: 24, color: "success.contrastText" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </Box>
          </Box>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            {t("homepage.features.items.accessible.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("homepage.features.items.accessible.description")}
          </Typography>
        </Box>

        {/* Offline Feature */}
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              mx: "auto",
              mb: 2,
              bgcolor: "secondary.main",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="svg"
              sx={{ width: 24, height: 24, color: "secondary.contrastText" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </Box>
          </Box>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            {t("homepage.features.items.offline.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("homepage.features.items.offline.description")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
