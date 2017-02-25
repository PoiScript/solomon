import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {TagComponent} from './tag.component'

@NgModule({
  imports: [RouterModule.forChild([{path: ':tag', component: TagComponent}])],
  exports: [RouterModule]
})

export class TagRouting {
}
