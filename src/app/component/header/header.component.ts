import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core'
import {Router} from '@angular/router'
import {DomSanitizer} from '@angular/platform-browser'
import {MdIconRegistry} from '@angular/material'

import {ResizeService} from '../../service/resize'

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

  constructor(private resizeService: ResizeService,
              private iconRegistry: MdIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {
    resizeService.window.subscribe(val => {
      if (val) this.isSMLayout = val.innerWidth <= 480
    })
    iconRegistry.addSvgIcon('solomon', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/solomon.svg'))
    iconRegistry.addSvgIcon('about', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/about.svg'))
    iconRegistry.addSvgIcon('archive', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/archive.svg'))
    iconRegistry.addSvgIcon('link', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/link.svg'))
    iconRegistry.addSvgIcon('search', sanitizer.bypassSecurityTrustResourceUrl('assets/icon/search.svg'))
  }

  toggleSearchBar(): void {
    this.searchBarVisibility = !this.searchBarVisibility
  }

  searchFor(keyword: string): void {
    if (keyword != '') this.router.navigate(['/search', {q: keyword}])
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 480
  }

}
