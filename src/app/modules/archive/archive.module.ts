import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {ArchiveRouting} from "./archive.routing"
import {ShareModule} from "../share/share.module"
import {ArchiveComponent} from "./archive.component"

@NgModule({
	imports: [
		CommonModule,
		ArchiveRouting,
		ShareModule
	],
	declarations: [
		ArchiveComponent
	]
})
export class ArchiveModule {
}
