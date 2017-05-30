import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from 'app/pages/homepage';
import {PostComponent} from 'app/pages/post';
import {LinkComponent} from 'app/pages/link';
import {AboutComponent} from 'app/pages/about';
import {TagComponent} from 'app/pages/tag';

const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'post/:slug', component: PostComponent},
  {path: 'link', component: LinkComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tag', component: TagComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouting {
}
