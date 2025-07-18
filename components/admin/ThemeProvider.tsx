'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useRedux';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme, moduleColors, isCustomThemeActive } = useAppSelector((state) => state.theme);

  useEffect(() => {
    if (isCustomThemeActive) {
      const root = document.documentElement;
      
      // Apply global theme colors
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
      });

      // Apply module-specific colors
      Object.entries(moduleColors).forEach(([moduleId, colors]) => {
        if (colors.enabled) {
          root.style.setProperty(`--color-${moduleId}-bg`, colors.background);
          root.style.setProperty(`--color-${moduleId}-text`, colors.text);
          root.style.setProperty(`--color-${moduleId}-accent`, colors.accent);
        }
      });
    }
  }, [currentTheme, moduleColors, isCustomThemeActive]);

  return <>{children}</>;
}