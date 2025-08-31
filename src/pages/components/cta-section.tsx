/**
 * Call to Action section component for the homepage
 * Final conversion section with action button
 */

import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <Box component="section" sx={{ textAlign: "center", py: 16 }}>
      <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
        {t("homepage.cta.title")}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        {t("homepage.cta.description")}
      </Typography>
      <Button href="/auth/sign-up" sx={{ px: 4, py: 1.5 }} variant="contained">
        {t("homepage.hero.cta.primary")}
      </Button>
    </Box>
  );
}
