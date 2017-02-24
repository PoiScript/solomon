import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ArchiveRouting} from './archive.routing'
import {ArchiveComponent} from './archive.component'

@NgModule({
  imports: [
    CommonModule,
    ArchiveRouting
  ],
  declarations: [
    ArchiveComponent
  ]
})
export class ArchiveModule {
}
