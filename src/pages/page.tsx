
/**
 * Main homepage route component
 * Displays different content based on authentication status
 */

import { Button, Box, Container, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Logo from "@/components/partials/global/Logo";
import { useBinders } from "@/hooks/useBinders";
import { useIsEmptyDatabase } from "@/hooks/useIsEmptyDatabase";
import { userAtom } from "@/utils/state/atoms";

import { CtaSection, FeaturesSection, HeroSection } from "./components";


export default function IndexPage() {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const binders = useBinders();
  const isEmptyDatabase = useIsEmptyDatabase();

  // Redirect to setup if user is authenticated and database is empty
  useEffect(() => {
    if (user && isEmptyDatabase === true) {
      navigate("/setup");
    }
  }, [user, isEmptyDatabase, navigate]);

  // Show loading state while checking user, binders, and database state
  if (!user && (binders === undefined || isEmptyDatabase === undefined)) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          p: 2,
        }}
      >
        <Logo sx={{ width: 64, height: 64, animation: "pulse 2s infinite" }} />
      </Box>
    );
  }

  // Authenticated user experience
  if (user) {
    const hasNoBinders = !binders || binders.length === 0;

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Logo sx={{ width: 64, height: 64, mx: "auto", mb: 2 }} />
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            {t("homepage.authenticated.welcome", { name: user.name })}
          </Typography>
        </Box>

        {hasNoBinders ? (
          // Empty state for first-time users
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {t("homepage.empty_state.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.125rem",
                color: "text.secondary",
                mb: 4,
                maxWidth: "32rem",
                mx: "auto",
              }}
            >
              {t("homepage.empty_state.subtitle")}
            </Typography>
            <Button href="/binders/create" sx={{ px: 4, py: 1.5 }} variant="contained">
              {t("homepage.empty_state.cta")}
            </Button>
          </Box>
        ) : (
          // Dashboard for existing users
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
                {t("homepage.authenticated.quick_actions")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button href="/binders" variant="contained">
                  {t("homepage.authenticated.recent_binders")}
                </Button>
                <Button href="/binders/create" variant="outlined">
                  {t("homepage.empty_state.cta")}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    );
  }

  // Non-authenticated user experience
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </Container>
  );
}
