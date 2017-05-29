import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './pages/homepage';
import {PostComponent} from './pages/post';
import {LinkComponent} from './pages/link';
import {AboutComponent} from './pages/about';
import {TagComponent} from './pages/tag';

const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'post', component: PostComponent},
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
