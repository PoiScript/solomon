import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {AboutRouting} from './about.routing'
import {AboutComponent} from './about.component'

@NgModule({
  imports: [
    CommonModule,
    AboutRouting,
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule {
}
