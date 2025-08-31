/**
 * @file src/components/partials/onboarding/WelcomeStep.tsx
 * @description Welcome step component for user onboarding setup flow.
 *
 * This component provides:
 * - Brief introduction to the application and setup phase
 * - Global settings configuration (language, theme, accessibility)
 * - Real-time settings persistence to database
 * - History logging for setup started action
 * - Tutorial preparation
 */

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Button, Typography, Container, Box, Paper, Alert } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Logo from "@/components/partials/global/Logo";
import LocaleSelector from "@/components/ui/LocaleSelector";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import { db } from "@/db";
import { type History, type Setting } from "@/db/models";

interface WelcomeStepProps {
  onContinue?: () => void;
}

export default function WelcomeStep({ onContinue }: WelcomeStepProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Create history entry for setup started on component mount
  const createSetupStartedHistory = useCallback(async () => {
    try {
      const setupHistory: History = {
        id: crypto.randomUUID(),
        entityType: "user",
        entityId: "system", // Using system for global setup events
        action: "setupStarted",
        performedBy: "system", // No user context yet in onboarding
        timestamp: new Date(),
        changes: {},
      };

      await db.createHistory(setupHistory);
    } catch (error) {
      console.error("Failed to log setup started history:", error);
    }
  }, []);

  // Initialize tutorial setting on component mount
  const initializeTutorialSetting = useCallback(async () => {
    try {
      const tutorialSetting: Setting = {
        key: "tutorial",
        value: true,
      };

      await db.upsertSetting(tutorialSetting);
    } catch (error) {
      console.error("Failed to initialize tutorial setting:", error);
    }
  }, []);

  // Handle setup initialization
  useEffect(() => {
    createSetupStartedHistory();
    initializeTutorialSetting();
  }, [createSetupStartedHistory, initializeTutorialSetting]);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Default navigation to binder creation since we're now in setup
      navigate("/binders/create");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Box sx={{ width: 80, height: 80, mx: "auto", mb: 3 }}>
          <Logo sx={{ width: "100%", height: "100%" }} />
        </Box>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          {t("onboarding.welcome.title", "Welcome to Pick'n'Talk!")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "md", mx: "auto" }}>
          {t("onboarding.welcome.subtitle", "Let's get you set up with your personalized communication experience. First, let's configure your preferences.")}
        </Typography>

        {/* Privacy and Data Information */}
        <Alert severity="info" sx={{ mb: 4, maxWidth: "md", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "info.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              mt: 0.5
            }}>
              <LockClosedIcon style={{ width: 20, height: 20 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t("onboarding.welcome.privacy.title", "Your Data, Your Control")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2">
                  {t("onboarding.welcome.privacy.local_storage", "All your communication binders and personal data are saved locally on your device. No information is sent to external servers without your explicit consent.")}
                </Typography>
                <Typography variant="body2">
                  {t("onboarding.welcome.privacy.synchronization", "You will have the option to synchronize your binders with other caregivers and professionals when you choose to enable this feature, giving you full control over data sharing.")}
                </Typography>
                <Typography variant="body2">
                  {t("onboarding.welcome.privacy.offline", "Pick'n'Talk works completely offline, ensuring your communication tools are always available when you need them.")}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Alert>
      </Box>

      {/* Settings Configuration Section */}
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

      {/* Information Section */}
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

      {/* Action Buttons */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center" }}>
        <Button onClick={handleContinue} variant="contained" sx={{ px: 4, py: 1.5 }}>
          {t("onboarding.welcome.cta.continue", "Continue Setup")}
        </Button>
        <Button
          href="/binders"
          variant="outlined"
          sx={{ px: 4, py: 1.5 }}
        >
          {t("onboarding.welcome.cta.skip", "Skip for Now")}
        </Button>
      </Box>
    </Container>
  );
}
