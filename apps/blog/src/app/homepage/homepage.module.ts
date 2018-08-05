import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [SharedModule],
  declarations: [HomepageComponent],
})
export class HomepageModule {}
