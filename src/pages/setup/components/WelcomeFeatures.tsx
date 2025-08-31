/**
 * @file src/components/partials/onboarding/WelcomeFeatures.tsx
 * @description Features showcase section for the welcome step
 */

import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function WelcomeFeatures() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "grid", md: { gridTemplateColumns: "1fr 1fr" }, gap: 3, mb: 4 }}>
      <Paper sx={{ textAlign: "center", p: 3, bgcolor: "primary.light", color: "primary.contrastText" }}>
        <Box sx={{
          width: 48,
          height: 48,
          mx: "auto",
          mb: 2,
          bgcolor: "primary.main",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("onboarding.welcome.features.customize.title", "Personalized Setup")}
        </Typography>
        <Typography variant="body2">
          {t("onboarding.welcome.features.customize.description", "We'll guide you through creating your first communication binder with pictures and words that matter to you.")}
        </Typography>
      </Paper>

      <Paper sx={{ textAlign: "center", p: 3, bgcolor: "secondary.light", color: "secondary.contrastText" }}>
        <Box sx={{
          width: 48,
          height: 48,
          mx: "auto",
          mb: 2,
          bgcolor: "secondary.main",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("onboarding.welcome.features.quick.title", "Quick & Easy")}
        </Typography>
        <Typography variant="body2">
          {t("onboarding.welcome.features.quick.description", "Get started in just a few minutes with our intuitive setup process and helpful tutorials.")}
        </Typography>
      </Paper>
    </Box>
  );
}
