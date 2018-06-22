import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LinkComponent } from './link/link.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { TagComponent } from './tag/tag.component';

const ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tag/:tag', component: TagComponent },
  { path: 'post/:slug', component: PostComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
