import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ThemeService {
  private isDark = false;

  private toggleThemeSource = new Subject<boolean>();

  toggleTheme$ = this.toggleThemeSource.asObservable();

  toggleTheme () {
    this.isDark = !this.isDark;
    this.toggleThemeSource.next(this.isDark);
  }
}
