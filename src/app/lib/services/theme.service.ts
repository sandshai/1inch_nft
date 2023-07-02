import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = false;

  getThemeClass() {
    return this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.className = this.getThemeClass();
  }
}
