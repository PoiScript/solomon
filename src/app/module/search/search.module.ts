import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SearchRouting} from './search.routing'
import {SearchComponent} from './search.component'
import {FormsModule} from '@angular/forms'
import {MdButtonModule, MdCardModule, MdCheckboxModule, MdIconModule, MdInputModule, MdListModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {SearchResultComponent} from './component/search-result'
import {ShareModule} from '../share'

@NgModule({
  imports: [
    CommonModule,
    SearchRouting,
    FormsModule,
    MdInputModule,
    MdCheckboxModule,
    MdCardModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    FlexLayoutModule,
    ShareModule
  ],
  declarations: [
    SearchComponent,
    SearchResultComponent
  ]
})
export class SearchModule {
}
