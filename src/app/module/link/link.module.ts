import {MdCardModule, MdListModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {LinkComponent} from './link.component';
import {LinkRouting} from './link.routing';
import {LinkService} from './service/link';
import {LinkListComponent} from './component/link-list';
import {ShareModule} from '../share';

@NgModule({
  imports: [
    CommonModule,
    LinkRouting,
    MdListModule,
    MdCardModule,
    FlexLayoutModule,
    ShareModule
  ],
  declarations: [
    LinkComponent,
    LinkListComponent
  ],
  providers: [
    LinkService
  ]
})
export class LinkModule {
}
