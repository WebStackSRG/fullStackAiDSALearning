/**
 * Theme Switching Card Controller
 * Handles theme toggling, system color scheme detection,
 * localStorage persistence, and accessible ARIA attributes.
 */

(() => {
  'use strict';

  // DOM Elements
  const htmlRoot = document.documentElement;
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('currentThemeLabel');
  const primaryBtn = document.getElementById('primaryBtn');
  const secondaryBtn = document.getElementById('secondaryBtn');

  const STORAGE_KEY = 'user-theme-preference';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';

  // 1. Detect System Color Preference
  const systemDarkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Determine the current active theme
   * Priority: 1) Saved localStorage preference, 2) OS/System preference, 3) Default 'light'
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
      return savedTheme;
    }
    return systemDarkMediaQuery.matches ? THEME_DARK : THEME_LIGHT;
  }

  /**
   * Apply theme to DOM and synchronize UI states
   * @param {'light' | 'dark'} theme 
   * @param {boolean} persist Whether to save choice in localStorage
   */
  function setTheme(theme, persist = true) {
    const isDark = theme === THEME_DARK;

    // Set HTML attribute for CSS variables
    htmlRoot.setAttribute('data-theme', theme);

    // Update ARIA role="switch" state
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-checked', String(isDark));
      toggleBtn.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    }

    // Update dynamic label badge
    if (themeLabel) {
      themeLabel.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    }

    // Persist choice if requested
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (err) {
        console.warn('Unable to persist theme preference:', err);
      }
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || THEME_LIGHT;
    const nextTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    setTheme(nextTheme, true);
  }

  // 2. Initialize on load
  const initialTheme = getPreferredTheme();
  // Don't overwrite localStorage on initial load if user hadn't set one yet
  setTheme(initialTheme, localStorage.getItem(STORAGE_KEY) !== null);

  // 3. Attach Event Listeners
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);

    // Keyboard support (Space and Enter are native for <button>, but ensuring smooth experience)
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  // 4. Respond to OS color scheme changes (if user hasn't explicitly saved a preference)
  systemDarkMediaQuery.addEventListener('change', (e) => {
    const hasManualPreference = localStorage.getItem(STORAGE_KEY) !== null;
    if (!hasManualPreference) {
      setTheme(e.matches ? THEME_DARK : THEME_LIGHT, false);
    }
  });

  // 5. Interactive Demo Actions (Connect / View Profile)
  if (primaryBtn) {
    let connected = false;
    primaryBtn.addEventListener('click', () => {
      connected = !connected;
      primaryBtn.textContent = connected ? 'Connected ✓' : 'Connect';
      primaryBtn.style.opacity = connected ? '0.85' : '1';
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener('click', () => {
      secondaryBtn.textContent = 'Opening...';
      setTimeout(() => {
        secondaryBtn.textContent = 'View Profile';
      }, 900);
    });
  }
})();
