import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core'

import {Intro} from '../../class/post'
import {ResizeService} from '../../service/resize'
import {ThemeService} from '../../service/theme'
import {HeaderService} from '../../service/header'
import {Router} from '@angular/router'

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
  isPost: boolean
  title: string
  intro: Intro

  constructor(private resizeService: ResizeService,
              private themeService: ThemeService,
              private router: Router,
              private headerService: HeaderService) {
    resizeService.window.subscribe(val => {
      if (val) this.isSMLayout = val.innerWidth <= 480
    })
    headerService.intro$.subscribe(intro => this.intro = intro)
    headerService.isPost$.subscribe(isPost => this.isPost = isPost)
    headerService.title$.subscribe(title => this.title = title)
  }

  toggleTheme(): void {
    this.themeService.toggleTheme()
  }

  toggleSearchBar(): void {
    this.searchBarVisibility = !this.searchBarVisibility
  }

  viewSource(): void {
    window.open(`/markdown/${this.intro.slug}.md`)
  }

  searchFor(keyword: string): void {
    if (keyword != '') this.router.navigate(['/search', {q: keyword}])
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 480
  }

}
