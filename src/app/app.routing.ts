import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {LinkComponent} from "./link/link.component"
import {ArchiveComponent} from "./archive"
import {CategoryComponent} from "./category"

const routes: Routes = [
	{path: '', redirectTo: 'recent', pathMatch: 'full'},
	{path: 'recent', loadChildren: './recent#RecentModule'},
	{path: 'category/:title', component: CategoryComponent},
	{path: 'about', loadChildren: './about#AboutModule'},
	{path: 'archive', component: ArchiveComponent},
	{path: 'post/:slug', loadChildren: './post#PostModule'},
	{path: 'links', component: LinkComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}