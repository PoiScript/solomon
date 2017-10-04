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
  {path: 'link', component: LinkComponent},
  {path: 'about', component: AboutComponent},
  {path: 'tag/:tag', component: TagComponent},
  {path: 'post', loadChildren: './post/post.module#PostModule'},
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
