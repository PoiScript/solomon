import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { HomepageComponent } from './homepage.component';
import { HomepageHeaderComponent } from './homepage-header/homepage-header.component';

@NgModule({
  imports: [SharedModule],
  declarations: [HomepageComponent, HomepageHeaderComponent],
})
export class HomepageModule {}
