import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  {path: '', loadChildren: './module/home/home.module#HomeModule'},
  {path: 'post', loadChildren: './module/post/post.module#PostModule'},
  {path: 'archive', loadChildren: './module/archive/archive.module#ArchiveModule'},
  {path: 'link', loadChildren: './module/link/link.module#LinkModule'},
  {path: 'about', loadChildren: './module/about/about.module#AboutModule'},
  {path: 'search', loadChildren: './module/search/search.module#SearchModule'},
  {path: 'tag', loadChildren: './module/tag/tag.module#TagModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRouting {
}
