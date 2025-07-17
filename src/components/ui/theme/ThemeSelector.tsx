import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { useTheme } from '@/utils/theme';
import { type ThemeConfig, getAllThemeConfigs, getThemeDisplayName } from '@/utils/theme/types';
import cn from '@/utils/cn';

interface ThemePreviewProps {
  config: ThemeConfig;
  className?: string;
}

function ThemePreview({ config, className }: ThemePreviewProps) {
  const colors = {
    success: config.daltonism === 'protanopia' ? '#3b82f6' : 
             config.daltonism === 'deuteranopia' ? '#3b82f6' : 
             config.daltonism === 'tritanopia' ? '#22c55e' : '#22c55e',
    warning: config.daltonism === 'tritanopia' ? '#ef4444' : '#eab308',
    error: config.daltonism === 'protanopia' ? '#0033cc' : 
           config.daltonism === 'deuteranopia' ? '#ef4444' : 
           config.daltonism === 'tritanopia' ? '#dc2626' : '#ef4444',
    info: config.daltonism === 'protanopia' ? '#00ced1' : 
          config.daltonism === 'deuteranopia' ? '#3b82f6' : 
          config.daltonism === 'tritanopia' ? '#22c55e' : '#3b82f6',
  };

  return (
    <div className={cn('flex gap-1.5', className)}>
      <div 
        className="w-4 h-4 rounded-full border border-gray-300" 
        style={{ backgroundColor: colors.success }}
        title="Success color"
      />
      <div 
        className="w-4 h-4 rounded-full border border-gray-300" 
        style={{ backgroundColor: colors.warning }}
        title="Warning color"
      />
      <div 
        className="w-4 h-4 rounded-full border border-gray-300" 
        style={{ backgroundColor: colors.error }}
        title="Error color"
      />
      <div 
        className="w-4 h-4 rounded-full border border-gray-300" 
        style={{ backgroundColor: colors.info }}
        title="Info color"
      />
    </div>
  );
}

export default function ThemeSelector() {
  const { t } = useTranslation();
  const { themeConfig, setThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const availableThemes = getAllThemeConfigs();

  const handleThemeSelect = (config: ThemeConfig) => {
    setThemeConfig(config);
    setIsOpen(false);
  };

  const getIcon = (config: ThemeConfig) => {
    if (config.variant === 'high-contrast') {
      return '👁️';
    }
    
    switch (config.daltonism) {
      case 'protanopia':
        return '🔴';
      case 'deuteranopia':
        return '🟢';
      case 'tritanopia':
        return '🔵';
      default:
        return config.mode === 'dark' ? '🌙' : '☀️';
    }
  };

  const getDescription = (config: ThemeConfig) => {
    if (config.variant === 'high-contrast') {
      return t('theme.highContrast.description', 'High contrast colors for better visibility');
    }
    
    switch (config.daltonism) {
      case 'protanopia':
        return t('theme.protanopia.description', 'Red-blind (difficulty with red/green)');
      case 'deuteranopia':
        return t('theme.deuteranopia.description', 'Green-blind (difficulty with red/green)');
      case 'tritanopia':
        return t('theme.tritanopia.description', 'Blue-blind (difficulty with blue/yellow)');
      default:
        return config.mode === 'dark' 
          ? t('theme.dark.description', 'Dark colors for low-light environments')
          : t('theme.light.description', 'Light colors for normal use');
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium theme-text-secondary mb-2">
        {t('theme.selector.label', 'Theme')}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative w-full cursor-pointer rounded-lg border py-2 pl-3 pr-10 text-left shadow-sm',
          'theme-bg-secondary theme-border-primary theme-text-primary',
          'focus:theme-border-focus focus:outline-none focus:ring-1 focus:theme-focus-ring',
          'sm:text-sm'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{getIcon(themeConfig)}</span>
          <div className="flex-1 min-w-0">
            <div className="theme-text-primary font-medium">
              {getThemeDisplayName(themeConfig)}
            </div>
            <div className="theme-text-secondary text-sm truncate">
              {getDescription(themeConfig)}
            </div>
          </div>
          <ThemePreview config={themeConfig} />
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className="h-5 w-5 theme-text-tertiary" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md theme-bg-secondary py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {availableThemes.map((config) => {
            const isSelected = 
              config.mode === themeConfig.mode &&
              config.daltonism === themeConfig.daltonism &&
              config.variant === themeConfig.variant;

            return (
              <button
                key={`${config.mode}-${config.daltonism}-${config.variant}`}
                onClick={() => handleThemeSelect(config)}
                className={cn(
                  'relative w-full cursor-pointer select-none py-2 pl-3 pr-9 text-left hover:theme-bg-tertiary',
                  isSelected && 'theme-info-bg theme-info-text'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getIcon(config)}</span>
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      'font-medium',
                      isSelected ? 'theme-info-text' : 'theme-text-primary'
                    )}>
                      {getThemeDisplayName(config)}
                    </div>
                    <div className={cn(
                      'text-sm truncate',
                      isSelected ? 'theme-info-text' : 'theme-text-secondary'
                    )}>
                      {getDescription(config)}
                    </div>
                  </div>
                  <ThemePreview config={config} />
                </div>
                
                {isSelected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5 theme-info-text" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}