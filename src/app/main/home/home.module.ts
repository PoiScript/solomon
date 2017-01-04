import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {HomeComponent} from "./home.component"
import {PostsComponent} from "./posts"
import {GitHubComponent} from "./github/github.component"
import {KitsuComponent} from "./kitsu"
import {HomeRouting} from "./home.routing"


@NgModule({
	imports: [
		HomeRouting,
		CommonModule,
		MaterialModule,
		FlexLayoutModule,
	],
	declarations: [
		HomeComponent,
		PostsComponent,
		GitHubComponent,
		KitsuComponent,
	]
})

export class HomeModule {
}
