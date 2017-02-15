import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MdCardModule, MdIconModule, MdListModule, MdSidenavModule, MdToolbarModule} from "@angular/material"
import {HeaderComponent} from "./component/header"
import {PostListComponent} from "./component/post-list"
import {OddPipe} from "./pipe/odd.pipe"
import {RouterModule} from "@angular/router"
import {YearPipe} from "./pipe/year.pipe"
import {PostService} from "./service/post"
import {GitHubService} from "./service/github"
import {FlexLayoutModule} from "@angular/flex-layout"
import {StepPipe} from "./pipe/step.pipe"
import {ThemeService} from "./service/theme"

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdIconModule,
    MdToolbarModule,
    MdCardModule,
    RouterModule,
    FlexLayoutModule,
    MdSidenavModule
  ],
  declarations: [
    HeaderComponent,
    PostListComponent,
    OddPipe,
    YearPipe,
    StepPipe
  ],
  exports: [
    HeaderComponent,
    PostListComponent,
    OddPipe,
    YearPipe,
    StepPipe
  ],
  providers: [
    PostService,
    GitHubService,
    ThemeService
  ]
})
export class ShareModule {
}
