import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TagComponent} from './tag.component';
import {TagRouting} from './tag.routing';
import {ShareModule} from '../share';
import { TagPipe } from './pipe/tag.pipe';

@NgModule({
  imports: [
    CommonModule,
    TagRouting,
    ShareModule
  ],
  declarations: [
    TagComponent,
    TagPipe
  ]
})
export class TagModule {
}
