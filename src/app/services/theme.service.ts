import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.darkTheme.asObservable();

  constructor() {
    this.initTheme();
  }

  initTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setDarkTheme(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setDarkTheme(prefersDark);
    }
  }

  setDarkTheme(isDark: boolean): void {
    this.darkTheme.next(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme(): void {
    this.setDarkTheme(!this.darkTheme.value);
  }
}
