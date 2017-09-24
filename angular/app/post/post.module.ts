import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.component';
import { PostViewerComponent } from './post-viewer/post-viewer.component';
import { CommentViewerComponent } from './comment-viewer/comment-viewer.component';
import { UpNextComponent } from './up-next/up-next.component';

@NgModule({
  imports: [
    HttpClientModule,
    PostRoutingModule,
    SharedModule,
    MdIconModule,
    MdButtonModule,
    MdListModule
  ],
  declarations: [
    PostComponent,
    PostViewerComponent,
    CommentViewerComponent,
    UpNextComponent
  ],
})
export class PostModule {}
