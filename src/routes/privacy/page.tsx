
/**
 * Privacy page.
 * Purpose: Display privacy section using only semantic components.
 */
import { useTranslation } from "react-i18next";
import PageSection from "@/components/partials/layout/PageSection";

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <PageSection title={t("privacy.title", "Privacy")}>{null}</PageSection>
  );
}
