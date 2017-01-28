import {Injectable, NgModule} from "@angular/core"
import {ActivatedRouteSnapshot, CanActivate, RouterModule} from "@angular/router"
import {SideNavService} from "./service/sidenav/sidenav.service"

@Injectable()
export class CanActivateTeam implements CanActivate {
	constructor(private sideNavService: SideNavService) {
	}

	canActivate(router: ActivatedRouteSnapshot) {
		if (window.innerWidth <= 960 || router.url[0].path === "post") this.sideNavService.closeSideNav()
		else this.sideNavService.openSideNav()
		return true
	}
}

@NgModule({
	imports: [
		RouterModule.forRoot([
			{path: '', redirectTo: 'recent', pathMatch: 'full'},
			{path: 'recent', loadChildren: './modules/recent#RecentModule', canActivate: [CanActivateTeam]},
			{path: 'archive', loadChildren: './modules/archive#ArchiveModule', canActivate: [CanActivateTeam]},
			{path: 'category/:title', loadChildren: './modules/category#CategoryModule', canActivate: [CanActivateTeam]},
			{path: 'link', loadChildren: './modules/link#LinkModule', canActivate: [CanActivateTeam]},
			{path: 'post', loadChildren: './modules/post#PostModule', canActivate: [CanActivateTeam]},
			{path: 'about', loadChildren: './modules/about#AboutModule', canActivate: [CanActivateTeam]},
			{path: 'search', loadChildren: './modules/search#SearchModule', canActivate: [CanActivateTeam]}
		])],
	exports: [
		RouterModule
	],
	providers: [
		CanActivateTeam,
		SideNavService
	]
})

export class AppRouting {
}