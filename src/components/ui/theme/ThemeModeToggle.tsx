import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

import { useThemeMode, type ThemeMode } from "@/utils/theme";

const THEME_MODES: Array<{ mode: ThemeMode; icon: typeof SunIcon }> = [
  { mode: "light", icon: SunIcon },
  { mode: "dark", icon: MoonIcon },
];

interface ThemeModeToggleProps {
  // className removed since MUI handles styling
}

export default function ThemeModeToggle(_props: ThemeModeToggleProps) {
  const { t } = useTranslation();
  const { themeMode, setThemeMode } = useThemeMode();

  const handleThemeChange = (event: any) => {
    setThemeMode(event.target.value as ThemeMode);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="theme-mode-label">
        {t("settings.theme.mode.label", "Theme Mode")}
      </InputLabel>
      <Select
        labelId="theme-mode-label"
        value={themeMode}
        onChange={handleThemeChange}
        label={t("settings.theme.mode.label", "Theme Mode")}
        renderValue={(value) => {
          const mode = THEME_MODES.find(m => m.mode === value);
          if (!mode) return value;
          const IconComponent = mode.icon;
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconComponent style={{ width: 20, height: 20 }} />
              <span>{t(`settings.theme.mode.${value}`, value)}</span>
            </Box>
          );
        }}
      >
        {THEME_MODES.map((mode) => {
          const IconComponent = mode.icon;
          return (
            <MenuItem key={mode.mode} value={mode.mode}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconComponent style={{ width: 20, height: 20 }} />
                <span>{t(`settings.theme.mode.${mode.mode}`, mode.mode)}</span>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
