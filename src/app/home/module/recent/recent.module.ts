import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MdCardModule, MdIconModule, MdListModule} from "@angular/material"
import {RecentRouting} from "./recent.routing"
import {RecentComponent} from "./recent.component"
import {FlexLayoutModule} from "@angular/flex-layout"
import {ShareModule} from "../../../share"
import {RepoListComponent} from "./component/repo-list"
import {AnimeListComponent} from "./component/anime-list"
import {KitsuService} from "./service/kitsu"

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
