import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useFontSize, type FontSize } from "@/utils/theme";

const FONT_SIZE_OPTIONS: Array<{ size: FontSize; icon: typeof DocumentTextIcon; scale: number }> = [
  { size: "normal", icon: DocumentTextIcon, scale: 1.0 },
  { size: "large", icon: DocumentTextIcon, scale: 1.125 },
  { size: "extra-large", icon: DocumentTextIcon, scale: 1.25 },
];

export default function FontSizeSelector() {
  const { t } = useTranslation();
  const { fontSize, setFontSize } = useFontSize();

  const handleFontSizeChange = (event: any) => {
    setFontSize(event.target.value as FontSize);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="font-size-label">
        {t("settings.accessibility.font_size.label", "Font Size")}
      </InputLabel>
      <Select
        labelId="font-size-label"
        value={fontSize}
        onChange={handleFontSizeChange}
        label={t("settings.accessibility.font_size.label", "Font Size")}
        renderValue={(value) => {
          const option = FONT_SIZE_OPTIONS.find(opt => opt.size === value);
          if (!option) return value;
          const IconComponent = option.icon;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconComponent style={{ width: 20, height: 20, transform: `scale(${option.scale})` }} />
              <span>{t(`settings.accessibility.font_size.${value}`, value)}</span>
            </Box>
          );
        }}
      >
        {FONT_SIZE_OPTIONS.map((option) => {
          const IconComponent = option.icon;
          return (
            <MenuItem key={option.size} value={option.size}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <IconComponent style={{ width: 20, height: 20, transform: `scale(${option.scale})` }} />
                <span>{t(`settings.accessibility.font_size.${option.size}`, option.size)}</span>
                <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                  ({Math.round(option.scale * 100)}%)
                </span>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
