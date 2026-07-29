export const THEME_STORAGE_KEY = 'apartment-dashboard-theme';

export const themeInitializationScript = `
(() => {
  const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
  let themeMode = 'system';

  try {
    const savedTheme = window.localStorage.getItem(storageKey);

    if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
      themeMode = savedTheme;
    }
  } catch {}

  const shouldUseDark =
    themeMode === 'dark' ||
    (themeMode === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', shouldUseDark);
})();
`;
