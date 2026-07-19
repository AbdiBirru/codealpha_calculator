/**
 * Theme toggle.
 * The initial theme is already applied by the inline script in <head>
 * (runs before first paint, so there's no flash of the wrong theme).
 * This file just wires up the toggle button and keeps things in sync.
 */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function updateMetaThemeColor(theme) {
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#F3F5FA' : '#0A0E17');
    }
  }

  function reflectState(theme) {
    toggleBtn.setAttribute('aria-pressed', String(theme === 'light'));
    toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    reflectState(theme);
    updateMetaThemeColor(theme);
  }

  const initial = root.getAttribute('data-theme') || 'dark';
  reflectState(initial);
  updateMetaThemeColor(initial);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    localStorage.setItem('theme-manual', 'true');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });

  // If the user never manually chose, keep following the OS setting
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme-manual')) return;
    applyTheme(e.matches ? 'light' : 'dark');
  });
});
