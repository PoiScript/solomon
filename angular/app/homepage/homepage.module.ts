import { NgModule } from '@angular/core';

import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    HomepageRoutingModule
  ],
  declarations: [
    HomepageComponent
  ]
})
export class HomepageModule {}
