import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import React from 'react';

import ThemeModeToggle from './ThemeModeToggle';

// Mock react-i18next
const mockT = (key: string) => key;
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: mockT }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

describe('ThemeModeToggle', () => {
  it('should render with default light theme', () => {
    render(
      <ThemeModeToggle />,
      { wrapper }
    );

    expect(screen.getByText('settings.theme.mode.light')).toBeInTheDocument();
  });

  it('should open dropdown when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeModeToggle />,
      { wrapper }
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('settings.theme.mode.dark')).toBeInTheDocument();
  });

  it('should change theme mode when option is selected', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeModeToggle />,
      { wrapper }
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const darkOption = screen.getByText('settings.theme.mode.dark');
    await user.click(darkOption);

    expect(screen.getByText('settings.theme.mode.dark')).toBeInTheDocument();
  });
});