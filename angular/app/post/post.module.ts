import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdInputModule, MdListModule, MdSnackBarModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CommentViewerComponent } from './comment-viewer/comment-viewer.component';
import { CommentService } from './shared/comment.service';
import { UpNextComponent } from './up-next/up-next.component';

@NgModule({
  imports: [
    PostRoutingModule,
    SharedModule,
    MdIconModule,
    MdButtonModule,
    MdListModule,
    MdSnackBarModule,
    MdInputModule
  ],
  declarations: [
    PostComponent,
    CommentEditorComponent,
    CommentViewerComponent,
    UpNextComponent
  ],
  providers: [
    CommentService
  ]
})
export class PostModule {}
