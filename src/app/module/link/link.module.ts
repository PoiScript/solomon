import {MdCardModule, MdListModule} from "@angular/material"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {LinkComponent} from "./link.component"
import {LinkRouting} from "./link.routing"
import {FlexLayoutModule} from "@angular/flex-layout"
import {LinkService} from "./service/link"
import {LinkListComponent} from './component/link-list/link.component'

@NgModule({
	imports: [
		CommonModule,
		LinkRouting,
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
