import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './core/about/about.component';

const routes: Routes = [
  {path: '', loadChildren: './homepage/homepage.module#HomepageModule', pathMatch: 'full'},
  {path: 'about', component: AboutComponent },
  {path: 'tag', loadChildren: './tag/tag.module#TagModule'},
  {path: 'link', loadChildren: './link/link.module#LinkModule'},
  {path: 'post', loadChildren: './post/post.module#PostModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
