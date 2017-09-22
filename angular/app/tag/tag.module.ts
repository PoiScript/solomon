import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TagComponent } from './tag.component';
import { TagPipe } from './tag.pipe';
import { TagRoutingModule } from './tag-routing.module';

@NgModule({
  imports: [
    TagRoutingModule,
    SharedModule
  ],
  declarations: [
    TagComponent,
    TagPipe
  ]
})
export class TagModule {}
