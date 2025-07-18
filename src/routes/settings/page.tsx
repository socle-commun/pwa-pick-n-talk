
import LocaleSelector from "@/components/ui/LocaleSelector";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import PageSection from "@/components/partials/layout/PageSection";
import PageTitle from "@/components/partials/layout/PageTitle";
import PageGrid from "@/components/partials/layout/PageGrid";
import SettingsSection from "@/components/partials/layout/SettingsSection";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <PageSection>
      <PageTitle>{t("Settings", "Settings")}</PageTitle>
      <PageGrid>
        <SettingsSection title={t("settings.language.title", "Language")}> 
          <PageSection>
            <LocaleSelector />
          </PageSection>
        </SettingsSection>
        <SettingsSection title={t("settings.accessibility.title", "Accessibility")}> 
          <PageSection>
            <FontSizeSelector />
            <ThemeModeToggle />
            <HighContrastModeToggle />
            <DaltonismModeToggle />
          </PageSection>
        </SettingsSection>
      </PageGrid>
    </PageSection>
  );
}
