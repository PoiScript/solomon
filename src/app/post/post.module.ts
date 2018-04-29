import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { PostComponent } from './post.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PostComponent],
})
export class PostModule {}
