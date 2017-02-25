import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HomeComponent} from './home.component'
import {HomeRouting} from './home.routing'
import {MdToolbarModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    MdToolbarModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {
}
