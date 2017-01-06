import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"

const routes: Routes = [
	{path: '', redirectTo: 'recent', pathMatch: 'full'},
	{path: 'recent', loadChildren: './main/recent#RecentModule'},
    {path:'about',      loadChildren: './main/about#AboutModule'},
    {path:'archive',    loadChildren: './main/archive#ArchiveModule'},
    {path:'post',       loadChildren: './main/post#PostModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouting {}