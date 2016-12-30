import { NgModule }     from '@angular/core'
import { CommonModule } from '@angular/common'

import { PostComponent } from './post.component'

import { PostRouting } from './post.routing'

@NgModule({
  imports: [
    CommonModule,
    PostRouting
  ],
  declarations: [
    PostComponent
  ]
})

export class PostModule {}
