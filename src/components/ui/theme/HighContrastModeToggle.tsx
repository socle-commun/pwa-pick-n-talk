import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

import cn from "@/utils/cn";
import { useHighContrastMode, type HighContrastMode } from "@/utils/theme";

const HIGH_CONTRAST_MODES: Array<{ mode: HighContrastMode; icon: typeof EyeIcon }> = [
  { mode: "normal", icon: EyeIcon },
  { mode: "high-contrast", icon: EyeSlashIcon },
];

interface HighContrastModeToggleProps {
  className?: string;
}

export default function HighContrastModeToggle({ className }: HighContrastModeToggleProps) {
  const { t } = useTranslation();
  const { highContrastMode, setHighContrastMode } = useHighContrastMode();

  const currentMode = HIGH_CONTRAST_MODES.find(m => m.mode === highContrastMode) || HIGH_CONTRAST_MODES[0];

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-secondary mb-2">
        {t("settings.accessibility.high_contrast.label", "High Contrast")}
      </label>

      <Combobox value={highContrastMode} onChange={(value) => value && setHighContrastMode(value)}>
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-primary bg-secondary py-2 pl-3 pr-10 text-left shadow-sm focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus">
          <div className="flex items-center gap-3">
            <currentMode.icon className="h-5 w-5 text-secondary" />
            <span className="font-medium text-primary">
              {t(`settings.accessibility.high_contrast.${highContrastMode}`, highContrastMode)}
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-secondary" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-secondary py-1 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
          {HIGH_CONTRAST_MODES.map((mode) => (
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
                  <mode.icon className="h-5 w-5" />
                  <span className={cn("font-medium", selected && "font-semibold")}>
                    {t(`settings.accessibility.high_contrast.${mode.mode}`, mode.mode)}
                  </span>
                </div>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
