import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.component';
import { PostViewerComponent } from './post-viewer/post-viewer.component';

@NgModule({
  imports: [
    PostRoutingModule,
    SharedModule
  ],
  declarations: [
    PostComponent,
    PostViewerComponent
  ]
})
export class PostModule {}
