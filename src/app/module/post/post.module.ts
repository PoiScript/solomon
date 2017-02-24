import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PostComponent} from './post.component'
import {PostRouting} from './post.routing'
import {RouterModule} from '@angular/router'
import {MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule, MdTooltipModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {CommentComponent} from './component/comment/comment.component'
import {FormsModule} from '@angular/forms'
import {PostService} from '../../service/post/post.service'
import {SnackBarService} from '../../service/snackbar/snack-bar.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostRouting,
    RouterModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdToolbarModule,
    FlexLayoutModule,
    MdTooltipModule,
    MdInputModule
  ],
  declarations: [
    PostComponent,
    CommentComponent
  ],
  providers: [
    SnackBarService,
    PostService
  ]
})
export class PostModule {
}
