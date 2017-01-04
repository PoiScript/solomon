import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"

const routes: Routes = [
    {path:'',           loadChildren: './main/home#HomeModule'},
    {path:'about',      loadChildren: './main/about#AboutModule'},
    {path:'archive',    loadChildren: './main/archive#ArchiveModule'},
    {path:'post',       loadChildren: './main/post#PostModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouting {}