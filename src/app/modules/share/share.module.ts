import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MdCardModule, MdIconModule, MdListModule, MdToolbarModule} from "@angular/material"
import {HeaderComponent} from "../../components/header"
import {PostListComponent} from "../../components/list/post"
import {OddPipe} from "../../pipe/odd.pipe"
import {RouterModule} from "@angular/router"
import {YearPipe} from "../../pipe/year.pipe"
import {PostService} from "../../service/post"
import {GitHubService} from "../../service/github"
import {FlexLayoutModule} from "@angular/flex-layout"

@NgModule({
	imports: [
		CommonModule,
		MdListModule,
		MdIconModule,
		MdToolbarModule,
		MdCardModule,
		RouterModule,
		FlexLayoutModule
	],
	declarations: [
		HeaderComponent,
		PostListComponent,
		OddPipe,
		YearPipe
	],
	exports: [
		HeaderComponent,
		PostListComponent,
		OddPipe,
		YearPipe
	],
	providers: [
		PostService,
		GitHubService
	]
})
export class ShareModule {
}
