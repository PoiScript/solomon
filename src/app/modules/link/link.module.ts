import {MdCardModule, MdListModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {LinkComponent} from "./link.component"
import {LinkRouting} from "./link.routing"
import {ShareModule} from "../share"
import {LinkService} from "../../service/link"
import {LinkListComponent} from "../../components/list/link"

@NgModule({
	imports: [
		CommonModule,
		LinkRouting,
		ShareModule,
		MdListModule,
		MdCardModule,
		FlexLayoutModule
	],
	declarations: [
		LinkComponent,
		LinkListComponent
	],
	providers: [
		LinkService
	]
})
export class LinkModule {
}
