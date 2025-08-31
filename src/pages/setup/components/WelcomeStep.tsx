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

import { Button, Typography, Container, Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Logo from "@/components/partials/global/Logo";
import { db } from "@/db";
import { type History, type Setting } from "@/db/models";

import WelcomeFeatures from "./WelcomeFeatures";
import WelcomePrivacyInfo from "./WelcomePrivacyInfo";
import WelcomeSettings from "./WelcomeSettings";

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
        <WelcomePrivacyInfo />
      </Box>

      {/* Settings Configuration Section */}
      <WelcomeSettings />

      {/* Information Section */}
      <WelcomeFeatures />

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
