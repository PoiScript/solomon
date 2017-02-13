import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {HomeComponent} from "./components/home/home.component"

const routes: Routes = [
	{path: 'post', loadChildren: './modules/post/post.module#PostModule'},
	{
		path: '', component: HomeComponent, children: [
		{path: '', redirectTo: 'recent', pathMatch: 'full'},
    {path: 'recent', loadChildren: './modules/recent/recent.module#RecentModule'},
    {path: 'archive', loadChildren: './modules/archive/archive.module#ArchiveModule'},
    {path: 'category/:title', loadChildren: './modules/category/category.module#CategoryModule'},
    {path: 'link', loadChildren: './modules/link/link.module#LinkModule'},
    {path: 'about', loadChildren: './modules/about/about.module#AboutModule'},
    {path: 'search', loadChildren: './modules/search/search.module#SearchModule'}
	]
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}
