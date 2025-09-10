import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Theme } from '../core/theme';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly theme = inject(Theme);

  setTheme(mode: 'light' | 'dark') {
    this.theme.applyTheme(mode);
  }
}
