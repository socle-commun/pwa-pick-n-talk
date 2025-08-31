/**
 * @file src/components/partials/onboarding/WelcomePrivacyInfo.tsx
 * @description Privacy and data information section for the welcome step
 */

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Alert, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function WelcomePrivacyInfo() {
  const { t } = useTranslation();

  return (
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
  );
}
