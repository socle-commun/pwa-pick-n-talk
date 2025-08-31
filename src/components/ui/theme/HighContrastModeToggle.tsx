import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { MenuItem, Select, FormControl, InputLabel, Box, type SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useHighContrastMode, type HighContrastMode } from "@/utils/theme";

const HIGH_CONTRAST_MODES: Array<{ mode: HighContrastMode; icon: typeof EyeIcon }> = [
  { mode: "normal", icon: EyeIcon },
  { mode: "high-contrast", icon: EyeSlashIcon },
];

export default function HighContrastModeToggle() {
  const { t } = useTranslation();
  const { highContrastMode, setHighContrastMode } = useHighContrastMode();

  const handleHighContrastChange = (event: SelectChangeEvent<string>) => {
    setHighContrastMode(event.target.value as HighContrastMode);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="high-contrast-label">
        {t("settings.accessibility.high_contrast.label", "High Contrast Mode")}
      </InputLabel>
      <Select
        labelId="high-contrast-label"
        value={highContrastMode}
        onChange={handleHighContrastChange}
        label={t("settings.accessibility.high_contrast.label", "High Contrast Mode")}
        renderValue={(value) => {
          const mode = HIGH_CONTRAST_MODES.find(m => m.mode === value);
          if (!mode) return value;
          const IconComponent = mode.icon;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconComponent style={{ width: 20, height: 20 }} />
              <span>{t(`settings.accessibility.high_contrast.${value}`, value)}</span>
            </Box>
          );
        }}
      >
        {HIGH_CONTRAST_MODES.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <MenuItem key={mode.mode} value={mode.mode}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <IconComponent style={{ width: 20, height: 20 }} />
                <span>{t(`settings.accessibility.high_contrast.${mode.mode}`, mode.mode)}</span>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
