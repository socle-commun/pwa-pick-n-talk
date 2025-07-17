import { useTranslation } from "react-i18next";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/20/solid";

import cn from "@/utils/cn";
import { type DaltonismType } from "@/db/entities/data/UserPreferences";
import useUserPreferences from "@/utils/state/useUserPreferences";

interface DaltonismOption {
  type: DaltonismType;
  label: string;
  description: string;
  icon: string;
}

const DALTONISM_OPTIONS: DaltonismOption[] = [
  {
    type: "none",
    label: "Normal Vision",
    description: "No color adjustment",
    icon: "👁️",
  },
  {
    type: "protanopia",
    label: "Protanopia",
    description: "Red-blind (difficulty with red/green)",
    icon: "🔴",
  },
  {
    type: "deuteranopia",
    label: "Deuteranopia",
    description: "Green-blind (difficulty with red/green)",
    icon: "🟢",
  },
  {
    type: "tritanopia",
    label: "Tritanopia",
    description: "Blue-blind (difficulty with blue/yellow)",
    icon: "🔵",
  },
];

interface DaltonismModeToggleProps {
  className?: string;
  variant?: "compact" | "full";
}

export default function DaltonismModeToggle({
  className,
  variant = "full",
}: DaltonismModeToggleProps) {
  const { t } = useTranslation();
  const { preferences, setDaltonismMode } = useUserPreferences();

  const currentOption = DALTONISM_OPTIONS.find(
    (option) => option.type === preferences.daltonism.type
  ) || DALTONISM_OPTIONS[0];

  const handleDaltonismChange = (option: DaltonismOption) => {
    const enabled = option.type !== "none";
    setDaltonismMode(enabled, option.type);
  };

  if (variant === "compact") {
    return (
      <Combobox value={currentOption} onChange={handleDaltonismChange}>
        <div className={cn("relative", className)}>
          <ComboboxButton className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
            <EyeIcon className="h-4 w-4 text-zinc-400" />
            <span className="text-sm">{currentOption.icon}</span>
            <ChevronDownIcon className="h-4 w-4 text-zinc-400" />
          </ComboboxButton>

          <ComboboxOptions className="absolute right-0 z-10 mt-2 w-64 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
            {DALTONISM_OPTIONS.map((option) => (
              <ComboboxOption
                key={option.type}
                value={option}
                className="flex cursor-pointer items-start gap-3 px-3 py-2 text-sm hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
              >
                <span className="text-lg mt-0.5">{option.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {option.description}
                  </div>
                </div>
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
        {t("accessibility.daltonism.label", "Daltonism Support")}
      </label>

      <Combobox value={currentOption} onChange={handleDaltonismChange}>
        <div className="relative">
          <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <EyeIcon className="h-5 w-5 text-zinc-400" />
              <span className="text-lg">{currentOption.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-900 dark:text-white">
                  {currentOption.label}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                  {currentOption.description}
                </div>
              </div>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            </span>
          </ComboboxButton>

          <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800">
            {DALTONISM_OPTIONS.map((option) => (
              <ComboboxOption
                key={option.type}
                value={option}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{option.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {option.description}
                    </div>
                  </div>
                  {option.type === currentOption.type && (
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

      {preferences.daltonism.enabled && (
        <div className="mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
            <EyeIcon className="h-4 w-4" />
            <span>
              {t("accessibility.daltonism.enabled", "Color adjustments are active for {{type}}", {
                type: currentOption.label
              })}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
