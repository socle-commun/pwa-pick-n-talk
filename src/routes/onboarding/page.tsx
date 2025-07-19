/**
 * @file src/routes/onboarding/page.tsx
 * @description Onboarding welcome page that provides initial setup and preferences configuration.
 *
 * This page serves as the entry point for the onboarding flow, allowing users to:
 * - Configure global settings and preferences
 * - Get introduced to the application
 * - Start the guided setup process
 */

import { WelcomeStep } from "@/components/partials/onboarding";

export default function OnboardingPage() {
  return <WelcomeStep />;
}
