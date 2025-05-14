import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService,
    public translationService: TranslationService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(lang: string): void {
    this.translationService.changeLanguage(lang);
  }

  logout(): void {
    this.authService.logout();
  }
}
