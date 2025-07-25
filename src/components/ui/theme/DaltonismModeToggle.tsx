import React from "react";
import { useTranslation } from "react-i18next";
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useDaltonismMode, type DaltonismMode } from "@/utils/theme";
import cn from "@/utils/cn";
import { ColorPreview } from "./ColorPreview";

const DALTONISM_MODES: Array<{ mode: DaltonismMode; icon: string }> = [
  { mode: "default", icon: "👁️" },
  { mode: "protanopia", icon: "🔴" },
  { mode: "deuteranopia", icon: "🟢" },
  { mode: "tritanopia", icon: "🔵" },
];

interface DaltonismModeToggleProps {
  className?: string;
}

export default function DaltonismModeToggle({ className }: DaltonismModeToggleProps) {
  const { t } = useTranslation();
  const { daltonismMode, setDaltonismMode } = useDaltonismMode();
  const currentMode = DALTONISM_MODES.find(m => m.mode === daltonismMode) || DALTONISM_MODES[0];
  const [infoVisible, setInfoVisible] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-secondary mb-2">
        {t("settings.accessibility.daltonism.label", "Daltonism Support")}
      </label>
      <Combobox
        value={daltonismMode}
        onChange={(value) => {
          if (value) {
            setDaltonismMode(value);
            setInfoVisible(true);
            setTimeout(() => setInfoVisible(false), 2500);
          }
        }}
      >
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-primary bg-secondary py-2 pl-3 pr-10 text-left shadow-sm focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus">
          <div className="flex items-center gap-3">
            <EyeIcon className="h-5 w-5 text-secondary" />
            <span className="text-lg">{currentMode.icon}</span>
            <span className="font-medium text-primary">
              {t(`accessibility.daltonism.options.${daltonismMode === "default" ? "none" : daltonismMode}.label`, daltonismMode)}
            </span>
            <ColorPreview daltonismType={daltonismMode} className="ml-2" />
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-secondary" />
          </span>
        </ComboboxButton>
        <ComboboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-secondary py-1 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
          {DALTONISM_MODES.map((mode) => (
            <ComboboxOption
              key={mode.mode}
              value={mode.mode}
              className={({ active, selected }) =>
                cn(
                  "relative cursor-pointer select-none py-2 pl-3 pr-9 transition-colors",
                  "hover:bg-interactive-primary hover:text-primary",
                  active && "bg-interactive-primary text-primary",
                  selected && "bg-interactive-primary font-semibold",
                  "dark:hover:bg-white/10 dark:hover:text-inverse",
                  active && "dark:bg-white/10 dark:text-inverse",
                  selected && "dark:bg-white/10 dark:font-semibold"
                )
              }
            >
              {({ selected }) => (
                <div className="flex items-center gap-3">
                  <EyeIcon className="h-5 w-5" />
                  <span className="text-lg">{mode.icon}</span>
                  <span className={cn("font-medium", selected && "font-semibold")}>{t(`accessibility.daltonism.options.${mode.mode === "default" ? "none" : mode.mode}.label`, mode.mode)}</span>
                  <ColorPreview daltonismType={mode.mode} className="ml-2" />
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
      {infoVisible && (
        <div className="mt-2 text-xs text-info bg-info/10 rounded px-2 py-1 transition-opacity duration-300">
          {t("settings.accessibility.daltonism.info", "Daltonism mode updated and colors previewed below.")}
        </div>
      )}
    </div>
  );
}
