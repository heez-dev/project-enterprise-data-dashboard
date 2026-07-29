'use client';

import { type ReactNode, useEffect } from 'react';
import { THEME_STORAGE_KEY } from '@/src/shared/constants/theme';
import {
  type ThemeMode,
  useUiPreferencesStore,
} from '@/src/shared/stores/use-ui-preferences-store';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const setThemeMode = useUiPreferencesStore((state) => state.setThemeMode);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialThemeMode = isThemeMode(savedTheme) ? savedTheme : 'system';
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(themeMode: ThemeMode) {
      const shouldUseDark =
        themeMode === 'dark' ||
        (themeMode === 'system' && mediaQuery.matches);

      document.documentElement.classList.toggle('dark', shouldUseDark);
    }

    applyTheme(initialThemeMode);
    window.localStorage.setItem(THEME_STORAGE_KEY, initialThemeMode);
    setThemeMode(initialThemeMode);

    const unsubscribe = useUiPreferencesStore.subscribe(
      (state, previousState) => {
        if (state.themeMode === previousState.themeMode) {
          return;
        }

        applyTheme(state.themeMode);
        window.localStorage.setItem(THEME_STORAGE_KEY, state.themeMode);
      },
    );
    const handleSystemThemeChange = () => {
      const currentThemeMode = useUiPreferencesStore.getState().themeMode;

      if (currentThemeMode === 'system') {
        applyTheme(currentThemeMode);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      unsubscribe();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [setThemeMode]);

  return children;
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}
