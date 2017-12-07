import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { PostRoutingModule } from './post-routing.module';

import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { CommentViewerComponent } from './comment-viewer/comment-viewer.component';
import { PostComponent } from './post.component';
import { UpNextComponent } from './up-next/up-next.component';

import { CommentService } from './shared';

@NgModule({
  imports: [
    PostRoutingModule,
    SharedModule
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
