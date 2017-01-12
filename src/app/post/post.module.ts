import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PostComponent} from "./post.component"
import {PostRouting} from "./post.routing"
import {MaterialModule} from "@angular/material"

@NgModule({
	imports: [
		CommonModule,
		PostRouting,
		MaterialModule
	],
	declarations: [
		PostComponent
	]
})

export class PostModule {
}
