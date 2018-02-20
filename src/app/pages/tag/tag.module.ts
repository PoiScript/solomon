import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { TagComponent } from './tag.component';
import { TagPipe } from './tag.pipe';

@NgModule({
  imports: [SharedModule],
  declarations: [
    TagComponent,
    TagPipe,
  ],
})
export class TagModule {}
