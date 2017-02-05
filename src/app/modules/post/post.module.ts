import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PostContentComponent} from "../../components/post-content"
import {ShareModule} from "../share"
import {PostComponent} from "./post.component"
import {PostRouting} from "./post.routing"
import {RouterModule} from "@angular/router"
import {CommentComponent} from "../../components/comment"
import {MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule, MdTooltipModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		PostRouting,
		RouterModule,
		MdIconModule,
		MdButtonModule,
		MdMenuModule,
		MdToolbarModule,
		FlexLayoutModule,
		MdTooltipModule
	],
	declarations: [
		PostComponent,
		PostContentComponent,
		CommentComponent
	]
})
export class PostModule {
}
