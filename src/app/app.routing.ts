import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"

const routes: Routes = [
	{path: '', redirectTo: 'recent', pathMatch: 'full'},
	{path: 'recent', loadChildren: './recent#RecentModule'},
	{path: 'about', loadChildren: './about#AboutModule'},
	{path: 'archive', loadChildren: './archive#ArchiveModule'},
	{path: 'post', loadChildren: './post#PostModule'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRouting {
}