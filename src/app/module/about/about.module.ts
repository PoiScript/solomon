import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutRouting} from './about.routing';
import {AboutComponent} from './about.component';
import {ShareModule} from '../share';
import {MdSidenavModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AboutRouting,
    ShareModule,
    MdSidenavModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {
}
