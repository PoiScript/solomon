import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {ArchiveComponent} from "./archive"
import {CategoryComponent} from "./category"
import {AboutComponent} from "./about"
import {PostComponent} from "./post"
import {RecentComponent} from "./recent"
import {LinksComponent} from "./links"

const routes: Routes = [
	{path: '', redirectTo: 'recent', pathMatch: 'full'},
	{path: 'recent', component: RecentComponent},
	{path: 'category/:title', component: CategoryComponent},
	{path: 'about', component: AboutComponent},
	{path: 'archive', component: ArchiveComponent},
	{path: 'post/:slug', component: PostComponent},
	{path: 'links', component: LinksComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}