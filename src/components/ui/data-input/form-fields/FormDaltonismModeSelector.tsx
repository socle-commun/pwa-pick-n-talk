/**
 * @file src/components/ui/data-input/form-fields/FormDaltonismModeSelector.tsx
 * @description Form-connected daltonism mode selector for user preferences.
 */

import React from "react";
import { useTranslation } from "react-i18next";
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Field, Label } from "../fieldset";
import { useFormField } from "@/components/ui/forms/hooks";
import { ColorPreview } from "@/components/ui/theme/ColorPreview";
import { type DaltonismMode } from "@/utils/theme";

const DALTONISM_MODES: Array<{ mode: DaltonismMode; icon: string }> = [
  { mode: "default", icon: "👁️" },
  { mode: "protanopia", icon: "🔴" },
  { mode: "deuteranopia", icon: "🟢" },
  { mode: "tritanopia", icon: "🔵" },
];

interface FormDaltonismModeSelectorProps {
  className?: string;
}

export default function FormDaltonismModeSelector({ className }: FormDaltonismModeSelectorProps) {
  const { t } = useTranslation();
  const { value, setValue } = useFormField("settings.daltonismMode");

  const daltonismMode = (value as DaltonismMode) || "default";
  const currentMode = DALTONISM_MODES.find(m => m.mode === daltonismMode) || DALTONISM_MODES[0];

  const [infoVisible, setInfoVisible] = React.useState(false);

  return (
    <Field className={className}>
      <Label>
        {t("settings.accessibility.daltonism.label", "Color Blindness Support")}
      </Label>

      <Combobox
        value={daltonismMode}
        onChange={(value) => {
          if (value) {
            setValue(value);
            setInfoVisible(true);
            setTimeout(() => setInfoVisible(false), 2500);
          }
        }}
      >
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
          <div className="flex items-center gap-3">
            <EyeIcon className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            <span className="text-lg">{currentMode.icon}</span>
            <span className="font-medium text-zinc-900 dark:text-white">
              {t(`accessibility.daltonism.options.${daltonismMode === "default" ? "none" : daltonismMode}.label`, daltonismMode)}
            </span>
            <ColorPreview daltonismType={daltonismMode} className="ml-2" />
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-zinc-400" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 min-w-full max-w-xs overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
          {DALTONISM_MODES.map((mode) => (
            <ComboboxOption
              key={mode.mode}
              value={mode.mode}
              className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
            >
              <div className="flex items-center gap-3">
                <EyeIcon className="h-5 w-5" />
                <span className="text-lg">{mode.icon}</span>
                <span className="font-medium">
                  {t(`accessibility.daltonism.options.${mode.mode === "default" ? "none" : mode.mode}.label`, mode.mode)}
                </span>
                <ColorPreview daltonismType={mode.mode} className="ml-2" />
              </div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>

      {infoVisible && (
        <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded px-2 py-1 transition-opacity duration-300">
          {t("settings.accessibility.daltonism.info", "Color blindness support updated and colors previewed above.")}
        </div>
      )}
    </Field>
  );
}
