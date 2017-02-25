import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ArchiveRouting} from './archive.routing'
import {ArchiveComponent} from './archive.component'
import {ShareModule} from '../share'
import {PostPreviewComponent} from './component/post-preview'

@NgModule({
  imports: [
    CommonModule,
    ArchiveRouting,
    ShareModule
  ],
  declarations: [
    ArchiveComponent,
    PostPreviewComponent
  ]
})
export class ArchiveModule {
}
