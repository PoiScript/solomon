import {Injectable} from "@angular/core"
import {Subject} from "rxjs"

@Injectable()
export class ThemeService {
  private isDark: boolean = false

  private toggleThemeSource = new Subject<boolean>()

  toggleTheme$ = this.toggleThemeSource.asObservable()

  toggleTheme() {
    this.isDark = !this.isDark
    this.toggleThemeSource.next(this.isDark)
  }
}
