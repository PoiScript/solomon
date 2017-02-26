import {Component, Input, OnInit} from '@angular/core'
import {ResizeService} from '../../../../service/resize/resize.service'
import {ThemeService} from '../../../../service/theme/theme.service'

@Component({
  selector: 'solomon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ResizeService]
})
export class HeaderComponent implements OnInit {
  isSMLayout: boolean
  @Input() headline: string

  constructor(private resizeService: ResizeService,
              private themeService: ThemeService) {
    resizeService.window.subscribe(val => {
      if (val) {
        this.isSMLayout = val.innerWidth <= 480
      }
    })
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 480
  }

}
