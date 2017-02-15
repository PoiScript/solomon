import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {AboutRouting} from "./about.routing"
import {AboutComponent} from "./about.component"
import {ShareModule} from "../../../share"
import {HomeShareModule} from "../share/share.module"

@NgModule({
  imports: [
    CommonModule,
    AboutRouting,
    ShareModule,
    HomeShareModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {
}
