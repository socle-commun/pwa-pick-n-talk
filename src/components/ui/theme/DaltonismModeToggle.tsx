import { EyeIcon } from "@heroicons/react/24/outline";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

import { useDaltonismMode, type DaltonismMode } from "@/utils/theme";

const DALTONISM_MODES: Array<{ mode: DaltonismMode; icon: string }> = [
  { mode: "default", icon: "👁️" },
  { mode: "protanopia", icon: "🔴" },
  { mode: "deuteranopia", icon: "🟢" },
  { mode: "tritanopia", icon: "🔵" },
];

interface DaltonismModeToggleProps {
  className?: string;
}

export default function DaltonismModeToggle(_props: DaltonismModeToggleProps) {
  const { t } = useTranslation();
  const { daltonismMode, setDaltonismMode } = useDaltonismMode();
  const [infoVisible, setInfoVisible] = React.useState(false);

  const handleDaltonismChange = (event: any) => {
    const newMode = event.target.value as DaltonismMode;
    setDaltonismMode(newMode);
    setInfoVisible(true);
    setTimeout(() => setInfoVisible(false), 2500);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="daltonism-mode-label">
        {t("settings.accessibility.daltonism.label", "Daltonism Support")}
      </InputLabel>
      <Select
        labelId="daltonism-mode-label"
        value={daltonismMode}
        onChange={handleDaltonismChange}
        label={t("settings.accessibility.daltonism.label", "Daltonism Support")}
        renderValue={(value) => {
          const mode = DALTONISM_MODES.find(m => m.mode === value);
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <EyeIcon style={{ width: 20, height: 20 }} />
              <span style={{ fontSize: "1rem" }}>{mode?.icon}</span>
              <span>{t(`accessibility.daltonism.options.${value === "default" ? "none" : value}.label`, value)}</span>
            </Box>
          );
        }}
      >
        {DALTONISM_MODES.map((mode) => (
          <MenuItem key={mode.mode} value={mode.mode}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <EyeIcon style={{ width: 20, height: 20 }} />
              <span style={{ fontSize: "1rem" }}>{mode.icon}</span>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span>{t(`accessibility.daltonism.options.${mode.mode === "default" ? "none" : mode.mode}.label`, mode.mode)}</span>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>

      {infoVisible && (
        <Box sx={{
          mt: 1,
          p: 1,
          bgcolor: "info.main",
          color: "info.contrastText",
          borderRadius: 1,
          fontSize: "0.75rem",
          transition: "opacity 0.3s"
        }}>
          {t("settings.accessibility.daltonism.info", "Daltonism mode updated and colors previewed below.")}
        </Box>
      )}
    </FormControl>
  );
}
