import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('es');
  currentLang$ = this.currentLang.asObservable();

  constructor(private translateService: TranslateService) {
    this.initTranslation();
  }

  initTranslation(): void {
    this.translateService.addLangs(['es', 'en']);
    this.translateService.setDefaultLang('es');

    const savedLang = localStorage.getItem('language');
    if (savedLang && this.translateService.getLangs().includes(savedLang)) {
      this.translateService.use(savedLang);
      this.currentLang.next(savedLang);
    } else {
      const browserLang = this.translateService.getBrowserLang();
      const lang = browserLang?.match(/es|en/) ? browserLang : 'es';
      this.translateService.use(lang);
      this.currentLang.next(lang);
    }
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
    this.currentLang.next(lang);
    localStorage.setItem('language', lang);
  }
}
