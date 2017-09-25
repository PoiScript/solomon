import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdListModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { CommentViewerComponent } from './comment-viewer/comment-viewer.component';
import { UpNextComponent } from './up-next/up-next.component';

@NgModule({
  imports: [
    PostRoutingModule,
    SharedModule,
    MdIconModule,
    MdButtonModule,
    MdListModule
  ],
  declarations: [
    PostComponent,
    CommentViewerComponent,
    UpNextComponent
  ],
})
export class PostModule {}
