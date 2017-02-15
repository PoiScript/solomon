import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ArchiveRouting} from "./archive.routing"
import {ArchiveComponent} from "./archive.component"
import {ShareModule} from "../../../share"
import {HomeShareModule} from "../share/share.module"

@NgModule({
	imports: [
		CommonModule,
		ArchiveRouting,
		ShareModule,
    HomeShareModule
	],
	declarations: [
		ArchiveComponent
	]
})
export class ArchiveModule {
}
