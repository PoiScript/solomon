import {animate, Component, Input, OnInit, state, style, transition, trigger} from '@angular/core'
import {ResizeService} from '../../../../service/resize/resize.service'
import {ThemeService} from '../../../../service/theme/theme.service'

@Component({
  selector: 'solomon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ResizeService],
  animations: [
    trigger('searchBarState', [
      state('true', style({width: '240px'})),
      state('false', style({width: '0'})),
      transition('1 => 0', animate(200)),
      transition('0 => 1', animate(200))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  searchBarVisibility: boolean = false
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

  toggleSearchBar(): void {
    this.searchBarVisibility = !this.searchBarVisibility
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 480
  }

}
