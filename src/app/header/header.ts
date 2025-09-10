import { Component, inject } from '@angular/core';
import { Theme } from '../core/theme';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly theme = inject(Theme);

  setTheme(mode: 'light' | 'dark') {
    this.theme.applyTheme(mode);
  }
}
