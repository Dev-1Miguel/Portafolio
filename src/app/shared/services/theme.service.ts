import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme-preference';
const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly mediaQuery =
    typeof window !== 'undefined' && 'matchMedia' in window
      ? window.matchMedia(DARK_MODE_QUERY)
      : null;

  private readonly systemTheme = signal<ResolvedTheme>(this.mediaQuery?.matches ? 'dark' : 'light');

  readonly preference = signal<ThemePreference>(this.readStoredPreference());
  readonly currentTheme = computed<ResolvedTheme>(() => {
    const preference = this.preference();

    if (preference === 'system') {
      return this.systemTheme();
    }

    return preference === 'dark' ? 'dark' : 'light';
  });

  constructor() {
    this.attachSystemThemeListener();
    this.applyTheme(this.currentTheme());
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(preference: ThemePreference): void {
    this.preference.set(preference);
    this.persistPreference(preference);
    this.applyTheme(this.currentTheme());
  }

  private readStoredPreference(): ThemePreference {
    if (typeof window === 'undefined') {
      return 'system';
    }

    try {
      const storedPreference = window.localStorage.getItem(STORAGE_KEY);
      return storedPreference === 'light' || storedPreference === 'dark' ? storedPreference : 'system';
    } catch {
      return 'system';
    }
  }

  private persistPreference(preference: ThemePreference): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      if (preference === 'system') {
        window.localStorage.removeItem(STORAGE_KEY);
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Ignore storage issues and keep the in-memory preference.
    }
  }

  private applyTheme(theme: ResolvedTheme): void {
    const root = this.document.documentElement;

    root.dataset['theme'] = theme;
    root.style.colorScheme = theme;
  }

  private attachSystemThemeListener(): void {
    if (!this.mediaQuery) {
      return;
    }

    const handleThemeChange = (event: MediaQueryListEvent): void => {
      this.systemTheme.set(event.matches ? 'dark' : 'light');

      if (this.preference() === 'system') {
        this.applyTheme(this.systemTheme());
      }
    };

    this.mediaQuery.addEventListener('change', handleThemeChange);
  }
}
