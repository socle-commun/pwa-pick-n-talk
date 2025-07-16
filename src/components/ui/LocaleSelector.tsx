import { useTranslation } from "react-i18next";

import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import cn from "@/utils/cn";

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

interface LocaleSelectorProps {
  className?: string;
  variant?: "compact" | "full";
}

export default function LocaleSelector({
  className,
  variant = "full",
}: LocaleSelectorProps) {
  const { t, i18n } = useTranslation();

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === i18n.language
  ) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language.code);
  };

  if (variant === "compact") {
    return (
      <Combobox value={currentLanguage} onChange={handleLanguageChange}>
        <div className={cn("relative", className)}>
          <ComboboxButton className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
            <span className="text-lg">{currentLanguage.flag}</span>
            <ChevronDownIcon className="h-4 w-4 text-zinc-400" />
          </ComboboxButton>

          <ComboboxOptions className="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
            {SUPPORTED_LANGUAGES.map((language) => (
              <ComboboxOption
                key={language.code}
                value={language}
                className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
              >
                <span className="text-lg">{language.flag}</span>
                <span>{t(`language.selector.${language.code === "en" ? "english" : language.code === "fr" ? "french" : "spanish"}`)}</span>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {t("language.selector.label")}
      </label>

      <Combobox value={currentLanguage} onChange={handleLanguageChange}>
        <div className="relative">
          <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="block truncate text-zinc-900 dark:text-white">
                {t(`language.selector.${currentLanguage.code === "en" ? "english" : currentLanguage.code === "fr" ? "french" : "spanish"}`)}
              </span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            </span>
          </ComboboxButton>

          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
            {SUPPORTED_LANGUAGES.map((language) => (
              <ComboboxOption
                key={language.code}
                value={language}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{language.flag}</span>
                  <span className="block truncate font-normal">
                    {t(`language.selector.${language.code === "en" ? "english" : language.code === "fr" ? "french" : "spanish"}`)}
                  </span>
                  {language.code === currentLanguage.code && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
