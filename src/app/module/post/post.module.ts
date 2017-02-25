import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule, MdTooltipModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'

import {PostComponent} from './post.component'
import {PostRouting} from './post.routing'
import {CommentComponent} from './component/comment'
import {PostService} from '../../service/post'
import {SnackBarService} from '../../service/snackbar'
import {HeaderPostComponent} from './component/post-header'
import {PostFooterComponent} from './component/post-footer'

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
    CommentComponent,
    HeaderPostComponent,
    PostFooterComponent
  ],
  providers: [
    SnackBarService,
    PostService
  ]
})
export class PostModule {
}
