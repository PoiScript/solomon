import {Component} from '@angular/core'
import {ThemeService} from './service/theme/theme.service'

@Component({
  selector: 'solomon',
  templateUrl: './app.component.html'
})

export class AppComponent {
  isDark: boolean

  constructor(private themeService: ThemeService) {
    themeService.toggleTheme$.subscribe(isDark => this.isDark = isDark)
  }
}
