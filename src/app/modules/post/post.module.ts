import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PostContentComponent} from "../../components/post-content"
import {ShareModule} from "../share"
import {PostComponent} from "./post.component"
import {PostRouting} from "./post.routing"
import {RouterModule} from "@angular/router"
import {CommentComponent} from "../../components/comment"
import {FooterComponent} from "../../components/footer"
import {MdButtonModule, MdCardModule, MdIconModule, MdMenuModule, MdToolbarModule} from "@angular/material"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		PostRouting,
		RouterModule,
		MdIconModule,
		MdCardModule,
		MdButtonModule,
		MdMenuModule,
		MdToolbarModule
	],
	declarations: [
		PostComponent,
		PostContentComponent,
		CommentComponent,
		FooterComponent
	]
})
export class PostModule {
}
