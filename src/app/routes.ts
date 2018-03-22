import { Routes } from '@angular/router';

import {
  AboutComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostComponent,
  PostResolver,
  TagComponent,
} from 'app/pages';

export const SOLOMON_ROUTES: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'link', component: LinkComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tag/:tag', component: TagComponent },
  {
    path: 'post/:slug',
    component: PostComponent,
    resolve: { resolve: PostResolver },
  },
  { path: '**', component: NotFoundComponent },
];
