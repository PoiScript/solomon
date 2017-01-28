import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ShareModule} from "../share"
import {SearchRouting} from "./search.routing"
import {SearchComponent} from "./search.component"
import {SearchBarComponent} from "../../components/search-bar"
import {KeywordPipe} from "../../pipe/keyword.pipe"
import {FormsModule} from "@angular/forms"
import {MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"

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
		KeywordPipe
	]
})
export class SearchModule {
}
