import { NgModule }     from '@angular/core'
import { CommonModule } from '@angular/common'

import { ArchiveComponent } from './archive.component'

import { ArchiveRouting } from './archive.routing'

@NgModule({
  imports: [
    CommonModule,
    ArchiveRouting
  ],
  declarations: [
    ArchiveComponent
  ]
})

export class ArchiveModule {}
