import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AboutComponent } from './about.component'
import { AboutRouting } from './about.routing'

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRouting
  ]
})

export class AboutModule {}