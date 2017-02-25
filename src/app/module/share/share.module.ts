import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule} from '@angular/material'

import {HeaderComponent} from './component/header'
import {RouterModule} from '@angular/router'
import {PostPreviewComponent} from './component/post-preview'

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    RouterModule,
    MdMenuModule
  ],
  declarations: [
    HeaderComponent,
    PostPreviewComponent
  ],
  exports: [
    HeaderComponent,
    PostPreviewComponent
  ]
})
export class ShareModule {
}
