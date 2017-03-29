import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MdButtonModule, MdIconModule, MdInputModule, MdMenuModule, MdToolbarModule} from '@angular/material';

import {RouterModule} from '@angular/router';
import {PostPreviewComponent} from './component/post-preview';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    RouterModule,
    MdMenuModule
  ],
  declarations: [
    PostPreviewComponent
  ],
  exports: [
    PostPreviewComponent
  ]
})
export class ShareModule {
}
