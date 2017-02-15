import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {SearchRouting} from "./search.routing"
import {SearchComponent} from "./search.component"
import {FormsModule} from "@angular/forms"
import {MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {SearchResultComponent} from "./component/search-result/search-result.component"
import {ShareModule} from "../../../share"
import {SearchBarComponent} from "./component/search-bar"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
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
		SearchBarComponent,
		SearchResultComponent
	]
})
export class SearchModule {
}
