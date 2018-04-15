import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { PostComponent } from './post.component';
import { UpNextComponent } from './up-next/up-next.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PostComponent, UpNextComponent],
})
export class PostModule {}
