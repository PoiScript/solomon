import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {HttpModule} from "@angular/http"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {AppComponent} from "./app.component"
import {NavComponent} from "./nav"
import {HeaderComponent} from "./header"
import {AppRouting} from "./app.routing"
import {PostService} from "./service/post"
import {YearPipe} from "./pipe/year.pipe"
import {ArchiveComponent} from "./archive"
import {CategoryComponent} from "./category"
import {KeywordPipe} from "./pipe/keyword.pipe"
import {CategoryService} from "./service/category"
import {ThemeService} from "./service/theme"
import {AboutComponent} from "./about"
import {PostComponent} from "./post"
import {TitleService} from "./service/title"
import {RecentComponent} from "./recent"
import {OddPipe} from "./pipe/odd.pipe"
import {PostListComponent} from "./component/post-list"
import {GitHubComponent} from "./recent/github"
import {KitsuComponent} from "./recent/kitsu"
import {PostsComponent} from "./recent/posts"
import {LinkService} from "./service/link"
import {LinksComponent} from "./links"
import {SearchComponent} from "./search"

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HeaderComponent,
		ArchiveComponent,
		CategoryComponent,
		AboutComponent,
		PostComponent,
		YearPipe,
		KeywordPipe,
		RecentComponent,
		OddPipe,
		PostListComponent,
		GitHubComponent,
		KitsuComponent,
		PostsComponent,
		LinksComponent,
		SearchComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRouting,
		MaterialModule.forRoot(),
		FlexLayoutModule.forRoot(),
	],
	providers: [
		PostService,
		CategoryService,
		ThemeService,
		TitleService,
		LinkService
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
