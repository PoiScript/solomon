import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { LinkComponent } from './link.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LinkComponent]
})
export class LinkModule {}
