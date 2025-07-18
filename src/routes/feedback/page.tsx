
/**
 * Feedback page.
 * Purpose: Display feedback section using only semantic components.
 */
import { useTranslation } from "react-i18next";
import PageSection from "@/components/partials/layout/PageSection";

export default function FeedbackPage() {
  const { t } = useTranslation();
  return (
    <PageSection title={t("feedback.title", "Feedback")}>{null}</PageSection>
  );
}
