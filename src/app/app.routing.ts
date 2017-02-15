import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {HomeComponent} from "./home/home.component"

const routes: Routes = [
	{path: 'post', loadChildren: './post/post.module#PostModule'},
	{
		path: '', component: HomeComponent, children: [
		{path: '', redirectTo: 'recent', pathMatch: 'full'},
    {path: 'recent', loadChildren: './home/module/recent/recent.module#RecentModule'},
    {path: 'archive', loadChildren: './home/module/archive/archive.module#ArchiveModule'},
    {path: 'category/:title', loadChildren: './home/module/category/category.module#CategoryModule'},
    {path: 'link', loadChildren: './home/module/link/link.module#LinkModule'},
    {path: 'about', loadChildren: './home/module/about/about.module#AboutModule'},
    {path: 'search', loadChildren: './home/module/search/search.module#SearchModule'}
	]
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}
