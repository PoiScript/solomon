import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {HeaderComponent} from "./component/header"
import {PostListComponent} from "./component/post-list"
import {
  MdButtonModule, MdCardModule, MdIconModule, MdListModule, MdSidenavModule,
  MdToolbarModule
} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {RouterModule} from "@angular/router"
import {OddPipe} from "./pipe/odd.pipe"
import {YearPipe} from "./pipe/year.pipe"
import {StepPipe} from "./pipe/step.pipe"

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdCardModule,
    RouterModule,
    FlexLayoutModule,
    MdSidenavModule,
    MdIconModule,
    MdListModule,
    MdButtonModule
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
  ]
})
export class HomeShareModule {
}
