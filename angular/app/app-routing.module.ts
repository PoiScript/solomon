import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AboutComponent,
  LinkComponent,
  NotFoundComponent,
  HomepageComponent,
  TagComponent
} from 'app/core';

const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: '404', component: NotFoundComponent},
  {path: 'link', component: LinkComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'post', loadChildren: './post/post.module#PostModule'},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
