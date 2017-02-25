import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HeaderComponent} from './component/header'
import {MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule} from '@angular/material'
import {RouterModule} from '@angular/router'

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
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class ShareModule {
}
