/**
 * Hero section component for the homepage
 * Displays the main call-to-action with app branding
 */

import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import Logo from "@/components/partials/global/Logo";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        py: 12,
        mb: 16,
      }}
    >
      <Logo sx={{ width: 96, height: 96, mx: "auto", mb: 8 }} />
      <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
        {t("homepage.hero.title")}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: "text.secondary",
          mb: 8,
          maxWidth: "48rem",
          mx: "auto",
        }}
      >
        {t("homepage.hero.subtitle")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button href="/auth/sign-up" sx={{ px: 4, py: 1.5 }} variant="contained">
          {t("homepage.hero.cta.primary")}
        </Button>
        <Button href="#features" sx={{ px: 4, py: 1.5 }} variant="outlined">
          {t("homepage.hero.cta.secondary")}
        </Button>
      </Box>
    </Box>
  );
}
