import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';

import { LinkRoutingModule } from './link-routing.module';
import { LinkComponent } from './link.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    LinkRoutingModule,
    SharedModule,
    MdListModule
  ],
  declarations: [
    LinkComponent
  ]
})
export class LinkModule {}
