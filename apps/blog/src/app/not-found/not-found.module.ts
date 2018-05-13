import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
