import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { LinkComponent } from './link.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LinkComponent],
})
export class LinkModule {}
