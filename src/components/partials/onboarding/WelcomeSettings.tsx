/**
 * @file src/components/partials/onboarding/WelcomeSettings.tsx
 * @description Settings configuration section for the welcome step
 */

import { Box, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";

export default function WelcomeSettings() {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        {t("onboarding.welcome.settings.title", "Your Preferences")}
      </Typography>

      <Box sx={{ display: "grid", md: { gridTemplateColumns: "1fr 1fr" }, gap: 3 }}>
        {/* Language Selection */}
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            {t("onboarding.welcome.settings.language.title", "Language")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("onboarding.welcome.settings.language.description", "Choose your preferred language for the interface.")}
          </Typography>
          <LocaleSelector />
        </Box>

        {/* Theme Settings */}
        <Box>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            {t("onboarding.welcome.settings.theme.title", "Appearance")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("onboarding.welcome.settings.theme.description", "Customize the look and feel of the application.")}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ThemeModeToggle />
            <FontSizeSelector />
          </Box>
        </Box>

        {/* Accessibility Settings */}
        <Box sx={{ gridColumn: { md: "1 / -1" } }}>
          <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
            {t("onboarding.welcome.settings.accessibility.title", "Accessibility")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("onboarding.welcome.settings.accessibility.description", "Configure accessibility features to enhance your experience.")}
          </Typography>
          <Box sx={{ display: "grid", md: { gridTemplateColumns: "1fr 1fr" }, gap: 2 }}>
            <HighContrastModeToggle />
            <DaltonismModeToggle />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
