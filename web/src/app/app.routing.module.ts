import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AboutComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostContainerComponent,
  TagComponent,
} from './component';
import { PostResolver } from './service/post-resolver';

const ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tag/:tag', component: TagComponent },
  {
    path: 'post/:slug',
    component: PostContainerComponent,
    resolve: { post: PostResolver },
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
  providers: [PostResolver],
})
export class AppRoutingModule {}
