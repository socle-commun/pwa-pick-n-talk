import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import LocaleSelector from "@/components/ui/LocaleSelector";
import DaltonismModeToggle from "@/components/ui/theme/DaltonismModeToggle";
import FontSizeSelector from "@/components/ui/theme/FontSizeSelector";
import HighContrastModeToggle from "@/components/ui/theme/HighContrastModeToggle";
import ThemeModeToggle from "@/components/ui/theme/ThemeModeToggle";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div >
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}>
        {t("Settings", "Settings")}
      </Typography>

      <div >
        <div >
          <div>
            <h2 >
              {t("settings.language.title", "Language")}
            </h2>
            <div >
              <LocaleSelector />
            </div>
          </div>
        </div>

        <div >
          <div>
            <h2 >
              {t("settings.accessibility.title", "Accessibility")}
            </h2>
            <div >
              <FontSizeSelector />
              <ThemeModeToggle />
              <HighContrastModeToggle />
              <DaltonismModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
