import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {RecentComponent} from "./recent.component"
import {PostsComponent} from "./posts"
import {GitHubComponent} from "./github/github.component"
import {KitsuComponent} from "./kitsu"
import {HomeRouting} from "./recent.routing"


@NgModule({
	imports: [
		HomeRouting,
		CommonModule,
		MaterialModule,
		FlexLayoutModule,
	],
	declarations: [
		RecentComponent,
		PostsComponent,
		GitHubComponent,
		KitsuComponent,
	],
})

export class RecentModule {
}
