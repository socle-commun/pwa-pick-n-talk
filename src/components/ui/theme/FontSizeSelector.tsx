import { useTranslation } from "react-i18next";
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { ChevronDownIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

import { useFontSize, type FontSize } from "@/utils/theme";
import cn from "@/utils/cn";

const FONT_SIZE_OPTIONS: Array<{ size: FontSize; icon: typeof DocumentTextIcon; scale: number }> = [
  { size: "normal", icon: DocumentTextIcon, scale: 1.0 },
  { size: "large", icon: DocumentTextIcon, scale: 1.125 },
  { size: "extra-large", icon: DocumentTextIcon, scale: 1.25 },
];

interface FontSizeSelectorProps {
  className?: string;
}

export default function FontSizeSelector({ className }: FontSizeSelectorProps) {
  const { t } = useTranslation();
  const { fontSize, setFontSize, scale } = useFontSize();

  const currentSize = FONT_SIZE_OPTIONS.find(s => s.size === fontSize) || FONT_SIZE_OPTIONS[0];

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-secondary mb-2">
        {t("settings.accessibility.fontSize.label", "Font Size")}
      </label>

      <Combobox value={fontSize} onChange={(value) => value && setFontSize(value)}>
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-primary bg-secondary py-2 pl-3 pr-10 text-left shadow-sm focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus">
          <div className="flex items-center gap-3">
            <currentSize.icon 
              className="h-5 w-5 text-secondary" 
              style={{ transform: `scale(${scale})` }}
            />
            <span className="font-medium text-primary">
              {t(`settings.accessibility.fontSize.${fontSize}`, fontSize)}
            </span>
            <span className="text-sm text-secondary ml-auto">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-secondary" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-secondary py-1 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
          {FONT_SIZE_OPTIONS.map((option) => (
            <ComboboxOption
              key={option.size}
              value={option.size}
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
                  <option.icon 
                    className="h-5 w-5" 
                    style={{ transform: `scale(${option.scale})` }}
                  />
                  <span className={cn("font-medium", selected && "font-semibold")}>
                    {t(`settings.accessibility.fontSize.${option.size}`, option.size)}
                  </span>
                  <span className="text-sm text-secondary ml-auto">
                    {Math.round(option.scale * 100)}%
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