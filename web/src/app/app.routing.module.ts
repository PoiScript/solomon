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

const ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tag/:tag', component: TagComponent },
  { path: 'post/:slug', component: PostContainerComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
