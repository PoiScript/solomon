import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { PostComponent } from './post.component';
import { UpNextComponent } from './up-next/up-next.component';
import { PostResolver } from './post-resolver/post-resolver.service';

@NgModule({
  imports: [SharedModule],
  declarations: [PostComponent, UpNextComponent],
  providers: [PostResolver],
})
export class PostModule {}
