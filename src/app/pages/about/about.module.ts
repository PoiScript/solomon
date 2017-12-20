import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { AboutComponent } from './about.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AboutComponent]
})
export class AboutModule {}
