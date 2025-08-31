/**
 * @file src/components/partials/onboarding/AccountTypeCard.tsx
 * @description Reusable account type selection card component
 */

import { Card, CardContent, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

type AccountType = "caregiver" | "professional";

interface AccountTypeCardProps {
  role: AccountType;
  onSelect: () => void;
}

// Icon function moved from CaregiverAccountsStep
const getAccountTypeIcon = (role: AccountType) => {
  switch (role) {
    case "caregiver":
      return (
        <Typography sx={{ fontSize: "2rem" }}>👥</Typography>
      );
    case "professional":
      return (
        <Typography sx={{ fontSize: "2rem" }}>👨‍⚕️</Typography>
      );
    default:
      return null;
  }
};

export default function AccountTypeCard({ role, onSelect }: AccountTypeCardProps) {
  const { t } = useTranslation();

  const isPrimary = role === "caregiver";
  const colorScheme = isPrimary ? "primary" : "secondary";

  const label = isPrimary
    ? t("onboarding.caregivers.add_caregiver", "Add Caregiver")
    : t("onboarding.caregivers.add_professional", "Add Professional");

  const description = isPrimary
    ? t("onboarding.caregivers.caregiver_description", "Family members, friends, or support persons")
    : t("onboarding.caregivers.professional_description", "Healthcare workers, therapists, educators");

  return (
    <Card
      role="button"
      tabIndex={0}
      sx={{
        p: 3,
        border: "2px dashed",
        borderColor: `${colorScheme}.main`,
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: `${colorScheme}.dark`,
          backgroundColor: `${colorScheme}.light`,
          opacity: 0.8
        },
        "&:focus": {
          outline: "2px solid",
          outlineColor: `${colorScheme}.main`,
          outlineOffset: "2px"
        },
        mb: isPrimary ? 2 : 0
      }}
      onClick={onSelect}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <CardContent sx={{ textAlign: "center", p: 0, "&:last-child": { pb: 0 } }}>
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center", color: `${colorScheme}.main` }}>
          {getAccountTypeIcon(role)}
        </Box>
        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
