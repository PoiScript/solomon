import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {ArchiveComponent} from './archive.component'

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ArchiveComponent}])],
  exports: [RouterModule]
})

export class ArchiveRouting {
}
