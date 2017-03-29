import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArchiveRouting} from './archive.routing';
import {ArchiveComponent} from './archive.component';
import {ShareModule} from '../share';

@NgModule({
  imports: [
    CommonModule,
    ArchiveRouting,
    ShareModule
  ],
  declarations: [
    ArchiveComponent
  ]
})
export class ArchiveModule {
}
