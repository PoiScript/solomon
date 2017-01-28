import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"

const routes: Routes = [
	{path: '', redirectTo: 'recent', pathMatch: 'full'},
	{path: 'recent', loadChildren: './modules/recent#RecentModule'},
	{path: 'archive', loadChildren: './modules/archive#ArchiveModule'},
	{path: 'category/:title', loadChildren: './modules/category#CategoryModule'},
	{path: 'link', loadChildren: './modules/link#LinkModule'},
	{path: 'post', loadChildren: './modules/post#PostModule'},
	{path: 'about', loadChildren: './modules/about#AboutModule'},
	{path: 'search', loadChildren: './modules/search#SearchModule'}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}