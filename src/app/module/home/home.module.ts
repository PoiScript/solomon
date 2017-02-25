import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HomeComponent} from './home.component'
import {HomeRouting} from './home.routing'
import {MdButtonModule, MdCardModule, MdChipsModule, MdIconModule, MdToolbarModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {ShareModule} from '../share'
import {PostCardComponent} from './component/post-card'

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
    PostCardComponent
  ]
})
export class HomeModule {
}
