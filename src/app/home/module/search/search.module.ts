import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SearchRouting} from "./search.routing"
import {SearchComponent} from "./search.component"
import {FormsModule} from "@angular/forms"
import {MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {SearchResultComponent} from "./component/search-result/search-result.component"
import {ShareModule} from "../../../share"
import {HomeShareModule} from "../share/share.module"

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    HomeShareModule,
    SearchRouting,
    FormsModule,
    MdInputModule,
    MdCheckboxModule,
    MdCardModule,
    MdIconModule,
    MdListModule,
    FlexLayoutModule
  ],
  declarations: [
    SearchComponent,
    SearchResultComponent
  ]
})
export class SearchModule {
}
