import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {AboutRouting} from "./about.routing"
import {AboutComponent} from "./about.component"
import {ShareModule} from "../../../share"

@NgModule({
  imports: [
    CommonModule,
    AboutRouting,
    ShareModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {
}
