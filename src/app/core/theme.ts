import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    const saved = (localStorage.getItem('vlm-ocr-theme') as 'light' | 'dark') || 'light';
    this.applyTheme(saved);
  }

  applyTheme(mode: 'light' | 'dark') {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-custom');
    document.body.classList.add(`theme-${mode}`);
    this.theme.set(mode);
    localStorage.setItem('vlm-ocr-theme', mode);
  }

  // custom theme removed
}
