import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {PostComponent} from "./post.component"
import {PostRouting} from "./post.routing"
import {RouterModule} from "@angular/router"
import {MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule, MdTooltipModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {ShareModule} from "../share/share.module"
import {CommentComponent} from "./component/comment/comment.component"

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
    CommentComponent
  ]
})
export class PostModule {
}
