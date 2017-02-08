import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {HomeComponent} from "./components/home/home.component"

const routes: Routes = [
	{path: 'post', loadChildren: './modules/post#PostModule'},
	{
		path: '', component: HomeComponent, children: [
		{path: '', redirectTo: 'recent', pathMatch: 'full'},
    {path: 'recent', loadChildren: 'app/modules/recent#RecentModule'},
    {path: 'archive', loadChildren: 'app/modules/archive#ArchiveModule'},
    {path: 'category/:title', loadChildren: 'app/modules/category#CategoryModule'},
    {path: 'link', loadChildren: 'app/modules/link#LinkModule'},
    {path: 'about', loadChildren: 'app/modules/about#AboutModule'},
    {path: 'search', loadChildren: 'app/modules/search#SearchModule'}
	]
	},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}
