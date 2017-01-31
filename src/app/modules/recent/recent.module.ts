import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MdCardModule, MdIconModule, MdListModule} from "@angular/material"
import {RecentRouting} from "./recent.routing"
import {KitsuService} from "../../service/kitsu"
import {ShareModule} from "../share"
import {RepoListComponent} from "../../components/list/repo"
import {AnimeListComponent} from "../../components/list/anime"
import {RecentComponent} from "./recent.component"
import {FlexLayoutModule} from "@angular/flex-layout"

@NgModule({
	imports: [
		CommonModule,
		RecentRouting,
		ShareModule,
		MdIconModule,
		MdListModule,
		MdCardModule,
		FlexLayoutModule
	],
	declarations: [
		RecentComponent,
		RepoListComponent,
		AnimeListComponent
	],
	providers: [
		KitsuService
	]
})
export class RecentModule {
}
