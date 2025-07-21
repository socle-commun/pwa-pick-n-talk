/**
 * @file src/components/ui/data-input/UserSettingsFormPanel.tsx
 * @description Form-connected personal settings panel for user preferences configuration.
 *
 * This component provides:
 * - Form-connected language selection
 * - Form-connected accessibility preferences (daltonism, high contrast, font size)
 * - Form-connected theme mode selection
 * - Integration with FormContext using form field hooks
 */

import { useTranslation } from "react-i18next";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import { Field, Label } from "./fieldset";
import { useFormField } from "@/components/ui/forms/hooks";
import { Heading } from "@/components/ui/typography";
import { FormLanguageSelector, FormToggleField, FormDaltonismModeSelector } from "./form-fields";

import cn from "@/utils/cn";
import type { ThemeMode, FontSize } from "@/utils/theme";

const THEME_MODES: Array<{ mode: ThemeMode; icon: typeof SunIcon }> = [
  { mode: "light", icon: SunIcon },
  { mode: "dark", icon: MoonIcon },
];

const FONT_SIZE_OPTIONS: Array<{ size: FontSize; icon: typeof DocumentTextIcon; scale: number }> = [
  { size: "normal", icon: DocumentTextIcon, scale: 1.0 },
  { size: "large", icon: DocumentTextIcon, scale: 1.125 },
  { size: "extra-large", icon: DocumentTextIcon, scale: 1.25 },
];

function FormThemeModeSelector({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { value, setValue } = useFormField("settings.themeMode");

  const themeMode = (value as ThemeMode) || "light";
  const currentMode = THEME_MODES.find(m => m.mode === themeMode) || THEME_MODES[0];

  return (
    <Field className={className}>
      <Label>
        {t("settings.theme.mode.label", "Theme Mode")}
      </Label>

      <Combobox value={themeMode} onChange={(value) => value && setValue(value)}>
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
          <div className="flex items-center gap-3">
            <currentMode.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="font-medium text-zinc-900 dark:text-white">
              {t(`settings.theme.mode.${themeMode}`, themeMode)}
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-zinc-400" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 min-w-full max-w-xs overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
          {THEME_MODES.map((mode) => (
            <ComboboxOption
              key={mode.mode}
              value={mode.mode}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
            >
              <div className="flex items-center gap-3">
                <mode.icon className="h-5 w-5" />
                <span className="font-medium">
                  {t(`settings.theme.mode.${mode.mode}`, mode.mode)}
                </span>
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}

function FormFontSizeSelector({ className }: { className?: string }) {
  const { t } = useTranslation();
  const { value, setValue } = useFormField("settings.fontSize");

  const fontSize = (value as FontSize) || "normal";
  const currentSize = FONT_SIZE_OPTIONS.find(s => s.size === fontSize) || FONT_SIZE_OPTIONS[0];

  return (
    <Field className={className}>
      <Label>
        {t("settings.accessibility.fontSize.label", "Font Size")}
      </Label>

      <Combobox value={fontSize} onChange={(value) => value && setValue(value)}>
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
          <div className="flex items-center gap-3">
            <currentSize.icon
              className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
              style={{ transform: `scale(${currentSize.scale})` }}
            />
            <span className="font-medium text-zinc-900 dark:text-white">
              {t(`settings.accessibility.fontSize.${fontSize}`, fontSize)}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-auto">
              {Math.round(currentSize.scale * 100)}%
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-zinc-400" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 min-w-full max-w-xs overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
          {FONT_SIZE_OPTIONS.map((option) => (
            <ComboboxOption
              key={option.size}
              value={option.size}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
            >
              <div className="flex items-center gap-3">
                <option.icon
                  className="h-5 w-5"
                  style={{ transform: `scale(${option.scale})` }}
                />
                <span className="font-medium">
                  {t(`settings.accessibility.fontSize.${option.size}`, option.size)}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-auto">
                  {Math.round(option.scale * 100)}%
                </span>
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}

interface UserSettingsFormPanelProps {
  className?: string;
}

export default function UserSettingsFormPanel({
  className,
}: UserSettingsFormPanelProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <Heading level={3} className="text-lg font-medium mb-4">
          {t("settings.personal.title", "Personal Preferences")}
        </Heading>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          {t("settings.personal.subtitle", "Customize your experience with personalized settings.")}
        </p>
      </div>

      {/* Language Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.language.title", "Language")}
        </Heading>
        <FormLanguageSelector className="max-w-xs" />
      </div>

      {/* Appearance Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.appearance.title", "Appearance")}
        </Heading>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormThemeModeSelector />
          <FormFontSizeSelector />
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="space-y-4">
        <Heading level={4} className="text-base font-medium">
          {t("settings.accessibility.title", "Accessibility")}
        </Heading>
        <div className="grid sm:grid-cols-2 gap-4">
          <FormDaltonismModeSelector />
          <FormToggleField
            name="settings.highContrast"
            label={t("settings.accessibility.highContrast.label", "High Contrast")}
          />
        </div>
      </div>
    </div>
  );
}
