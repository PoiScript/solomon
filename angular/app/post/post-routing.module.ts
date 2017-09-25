import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostResolver } from './post-resolver.service';

const routes: Routes = [
  {
    path: ':slug',
    component: PostComponent,
    resolve: {
      resolve: PostResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PostResolver
  ]
})

export class PostRoutingModule {}
