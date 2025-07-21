/**
 * @file src/components/ui/data-input/form-fields/FormLanguageSelector.tsx
 * @description Form-connected language selector for user preferences.
 */

import { useTranslation } from "react-i18next";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { Field, Label } from "../fieldset";
import { useFormField } from "@/components/ui/forms/hooks";

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

interface FormLanguageSelectorProps {
  className?: string;
}

export default function FormLanguageSelector({ className }: FormLanguageSelectorProps) {
  const { t } = useTranslation();
  const { value, setValue } = useFormField("settings.language");

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    (lang) => lang.code === (value as string)
  ) || SUPPORTED_LANGUAGES[0];

  const handleLanguageChange = (language: Language) => {
    setValue(language.code);
  };

  return (
    <Field className={className}>
      <Label>
        {t("language.selector.label", "Language")}
      </Label>

      <Combobox value={currentLanguage} onChange={handleLanguageChange}>
        <div className="relative">
          <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="block truncate text-zinc-900 dark:text-white">
                {t(`language.selector.${getLanguageKey(currentLanguage.code)}`)}
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
                    {t(`language.selector.${getLanguageKey(language.code)}`)}
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
    </Field>
  );
}
