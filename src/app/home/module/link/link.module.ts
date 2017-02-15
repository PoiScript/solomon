import {MdCardModule, MdListModule} from "@angular/material"
import {CommonModule} from "@angular/common"
import {NgModule} from "@angular/core"
import {LinkComponent} from "./link.component"
import {LinkRouting} from "./link.routing"
import {FlexLayoutModule} from "@angular/flex-layout"
import {ShareModule} from "../../../share"
import {LinkListComponent} from "./component/link"
import {LinkService} from "./service/link"
import {HomeShareModule} from "../share/share.module"

@NgModule({
	imports: [
		CommonModule,
		LinkRouting,
		ShareModule,
		HomeShareModule,
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
