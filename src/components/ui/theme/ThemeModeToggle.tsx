import { useTranslation } from 'react-i18next';
import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

import { useThemeMode, type ThemeMode } from '@/utils/theme';
import cn from '@/utils/cn';

const THEME_MODES: Array<{ mode: ThemeMode; icon: typeof SunIcon }> = [
  { mode: 'light', icon: SunIcon },
  { mode: 'dark', icon: MoonIcon },
];

interface ThemeModeToggleProps {
  className?: string;
}

export default function ThemeModeToggle({ className }: ThemeModeToggleProps) {
  const { t } = useTranslation();
  const { themeMode, setThemeMode } = useThemeMode();

  const currentMode = THEME_MODES.find(m => m.mode === themeMode) || THEME_MODES[0];

  return (
    <div className={cn('relative', className)}>
      <label className="block text-sm font-medium text-secondary mb-2">
        {t('settings.theme.mode.label', 'Theme Mode')}
      </label>
      
      <Combobox value={themeMode} onChange={(value) => value && setThemeMode(value)}>
        <ComboboxButton className="relative w-full cursor-pointer rounded-lg border border-primary bg-secondary py-2 pl-3 pr-10 text-left shadow-sm focus:border-focus focus:outline-none focus:ring-1 focus:ring-focus">
          <div className="flex items-center gap-3">
            <currentMode.icon className="h-5 w-5 text-secondary" />
            <span className="font-medium text-primary">
              {t(`settings.theme.mode.${themeMode}`, themeMode)}
            </span>
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-secondary" />
          </span>
        </ComboboxButton>

        <ComboboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-secondary py-1 shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none">
          {THEME_MODES.map((mode) => (
            <ComboboxOption
              key={mode.mode}
              value={mode.mode}
              className={({ active, selected }) =>
                cn(
                  'relative cursor-pointer select-none py-2 pl-3 pr-9',
                  active && 'bg-interactive-primary text-inverse',
                  selected && 'bg-interactive-primary text-inverse'
                )
              }
            >
              {({ selected }) => (
                <div className="flex items-center gap-3">
                  <mode.icon className="h-5 w-5" />
                  <span className={cn('font-medium', selected && 'font-semibold')}>
                    {t(`settings.theme.mode.${mode.mode}`, mode.mode)}
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