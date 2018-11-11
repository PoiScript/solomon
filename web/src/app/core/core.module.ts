import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { PostService } from './post.service';

@NgModule({
  imports: [SharedModule],
  providers: [PostService],
})
export class CoreModule {}
