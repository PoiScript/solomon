import {Component, Inject, OnDestroy, OnInit, ViewChild} from "@angular/core"
import {MdSidenav} from "@angular/material"
import {SideNavService} from "./service/sidenav"
import {CategoryService} from "./service/category"
import {Subscription} from "rxjs"
import {Category} from "../share/classes/Category"
import {ResizeService} from "./service/resize"
import {Router} from "@angular/router"
import {ThemeService} from "../share/service/theme"
import {SolomonConfig} from "../share/interface/solomon-config"
import {CONFIG_TOKEN} from "../config"

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [
    ResizeService,
    CategoryService,
    SideNavService
  ]
})

export class HomeComponent implements OnInit, OnDestroy {
  BLOG_NAME: string
  isDark: boolean
  isSMLayout: boolean
  @ViewChild('sidenav') sideNav: MdSidenav
  categories: Category[]
  toggleSubscription: Subscription
  resizeSubscription: Subscription

  constructor(private router: Router,
              private themeService: ThemeService,
              private categoryService: CategoryService,
              private sideNavService: SideNavService,
              private resizeService: ResizeService,
              @Inject(CONFIG_TOKEN) config: SolomonConfig) {
    this.toggleSubscription = sideNavService.toggleSideNav$
      .subscribe(() => this.sideNav.toggle())
    this.resizeSubscription = resizeService.window.subscribe(val => {
      if (val) this.isSMLayout = val.innerWidth <= 960
    })
    this.router.events.subscribe(val => {
      if (this.isSMLayout) this.sideNav.close()
    })
    this.themeService.toggleTheme$.subscribe(isDark => this.isDark = isDark)
    this.BLOG_NAME = config.BLOG_NAME
  }

  getCategorise(): void {
    this.categoryService
      .getCategories()
      .then((categories) => this.categories = categories)
  }

  toggleChange(checked): void {
    this.isDark = checked
    this.themeService.toggleTheme()
  }

  titleClick(): void {
    console.log('Title Clicked.')
  }

  ngOnInit(): void {
    this.isSMLayout = window.innerWidth <= 960
    this.getCategorise()
    this.isDark = this.themeService.getTheme()
  }

  ngOnDestroy(): void {
    this.toggleSubscription.unsubscribe()
    this.resizeSubscription.unsubscribe()
  }
}
