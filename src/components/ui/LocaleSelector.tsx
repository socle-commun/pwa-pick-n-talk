
import { MenuItem, Select, FormControl, Box, type SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// Helper function to get language key for translation
const getLanguageKey = (code: string): string => {
  switch (code) {
    case "en":
      return "english";
    case "fr":
      return "french";
    case "es":
      return "spanish";
    default:
      return "english";
  }
};

interface LocaleSelectorProps {
  variant?: "compact" | "full";
}

export default function LocaleSelector({
  variant = "full",
}: LocaleSelectorProps) {
  const { t, i18n } = useTranslation();

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === i18n.language
  ) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === event.target.value);
    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage.code);
    }
  };

  if (variant === "compact") {
    return (
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <Select
          value={currentLanguage.code}
          onChange={handleLanguageChange}
          variant="outlined"
          size="small"
          renderValue={(value) => {
            const lang = SUPPORTED_LANGUAGES.find(l => l.code === value);
            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span style={{ fontSize: "1rem" }}>{lang?.flag}</span>
              </Box>
            );
          }}
        >
          {SUPPORTED_LANGUAGES.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <span style={{ fontSize: "1.25rem" }}>{language.flag}</span>
                <span>{t(`language.selector.${getLanguageKey(language.code)}`)}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth>
      <Select
        value={currentLanguage.code}
        onChange={handleLanguageChange}
        variant="outlined"
        renderValue={(value) => {
          const lang = SUPPORTED_LANGUAGES.find(l => l.code === value);
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <span style={{ fontSize: "1.25rem" }}>{lang?.flag}</span>
              <span>{t(`language.selector.${getLanguageKey(lang?.code || "en")}`)}</span>
            </Box>
          );
        }}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <span style={{ fontSize: "1.25rem" }}>{language.flag}</span>
              <span>{t(`language.selector.${getLanguageKey(language.code)}`)}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
