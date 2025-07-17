import { useTranslation } from "react-i18next";
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/20/solid";

import cn from "@/utils/cn";
import { type DaltonismType } from "@/utils/daltonism/types";
import useDaltonismSettings from "@/utils/state/useDaltonismSettings";
import { DaltonismOption, type DaltonismOptionType } from "./DaltonismOption";
import { ColorPreview } from "./ColorPreview";

const DALTONISM_TYPES: Array<{ type: DaltonismType; icon: string }> = [
  { type: "none", icon: "👁️" }, { type: "protanopia", icon: "🔴" },
  { type: "deuteranopia", icon: "🟢" }, { type: "tritanopia", icon: "🔵" },
];

interface DaltonismModeToggleProps {
  className?: string;
  variant?: "compact" | "full";
}

export default function DaltonismModeToggle({ className, variant = "full" }: DaltonismModeToggleProps) {
  const { t } = useTranslation();
  const { daltonismConfig, setDaltonismMode } = useDaltonismSettings();

  const getDaltonismOption = (type: DaltonismType): DaltonismOptionType => ({
    type,
    label: t(`accessibility.daltonism.options.${type}.label`),
    icon: DALTONISM_TYPES.find(c => c.type === type)?.icon || "👁️",
  });

  const daltonismOptions = DALTONISM_TYPES.map(c => getDaltonismOption(c.type));
  const currentOption = getDaltonismOption(daltonismConfig.type);

  const compactButton = (
    <ComboboxButton className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700">
      <EyeIcon className="h-4 w-4 text-zinc-400" />
      <span className="text-sm">{currentOption.icon}</span>
      <ChevronDownIcon className="h-4 w-4 text-zinc-400" />
    </ComboboxButton>
  );

  const fullButton = (
    <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-zinc-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <EyeIcon className="h-5 w-5 text-zinc-400" />
        <span className="text-lg">{currentOption.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-zinc-900 dark:text-white">{currentOption.label}</div>
          <ColorPreview daltonismType={currentOption.type} className="mt-1" />
        </div>
      </div>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
      </span>
    </ComboboxButton>
  );

  const optionsDropdown = (
    <ComboboxOptions className={cn(
      "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg focus:outline-none dark:border-zinc-600 dark:bg-zinc-800",
      variant === "compact" && "right-0 mt-2 w-64"
    )}>
      {daltonismOptions.map((option) => (
        <ComboboxOption
          key={option.type}
          value={option}
          className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-zinc-100 data-[focus]:bg-blue-100 data-[selected]:bg-blue-50 dark:text-white dark:hover:bg-zinc-700 dark:data-[focus]:bg-blue-900 dark:data-[selected]:bg-blue-900"
        >
          <DaltonismOption option={option} isSelected={option.type === currentOption.type} />
        </ComboboxOption>
      ))}
    </ComboboxOptions>
  );

  const statusMessage = daltonismConfig.enabled && (
    <div className="mt-2 p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
      <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
        <EyeIcon className="h-4 w-4" />
        <span>{t("accessibility.daltonism.enabled", { type: currentOption.label })}</span>
      </div>
    </div>
  );

  if (variant === "compact") {
    return (
      <Combobox value={currentOption} onChange={(option: DaltonismOptionType) => setDaltonismMode(option.type !== "none", option.type)}>
        <div className={cn("relative", className)}>
          {compactButton}
          {optionsDropdown}
        </div>
      </Combobox>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {t("accessibility.daltonism.label")}
      </label>
      <Combobox value={currentOption} onChange={(option: DaltonismOptionType) => setDaltonismMode(option.type !== "none", option.type)}>
        <div className="relative">
          {fullButton}
          {optionsDropdown}
        </div>
      </Combobox>
      {statusMessage}
    </div>
  );
}
