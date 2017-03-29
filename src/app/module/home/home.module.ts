import {NgModule} from '@angular/core';
import {HomeRouting} from './home.routing';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdCardModule, MdChipsModule, MdIconModule, MdToolbarModule} from '@angular/material';

import {HomeComponent} from './home.component';
import {ShareModule} from '../share';
import {HomeColumnComponent} from './component/home-column';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdChipsModule,
    FlexLayoutModule,
    ShareModule,
    MdCardModule
  ],
  declarations: [
    HomeComponent,
    HomeColumnComponent
  ]
})
export class HomeModule {
}
