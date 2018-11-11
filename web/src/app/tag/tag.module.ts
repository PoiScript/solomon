import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { TagComponent } from './tag.component';

@NgModule({
  imports: [SharedModule],
  declarations: [TagComponent],
})
export class TagModule {}
