/**
 * @file src/routes/setup/page.tsx
 * @description Setup page that provides initial onboarding and welcome step configuration.
 *
 * This page serves as the entry point for the setup flow, allowing users to:
 * - Configure global settings and preferences
 * - Get introduced to the application
 * - Start the guided binder creation process
 */

import { WelcomeStep } from "@/components/partials/onboarding";

export default function SetupPage() {
  return <WelcomeStep />;
}
