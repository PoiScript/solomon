import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {FormsModule} from "@angular/forms"
import {HttpModule} from "@angular/http"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {AppComponent} from "./app.component"
import {NavComponent} from "./nav"
import {HeaderComponent} from "./component/header"
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
import {RecentComponent} from "./recent"
import {OddPipe} from "./pipe/odd.pipe"
import {GitHubComponent} from "./recent/github"
import {KitsuComponent} from "./recent/kitsu"
import {PostsComponent} from "./recent/posts"
import {LinkService} from "./service/link"
import {LinksComponent} from "./links"
import {SearchComponent} from "./search"
import {SideNavService} from "./service/sidenav"
import {BookComponent} from "./recent/book"
import {BookService} from "./service/book"
import {PostListComponent} from "./component/list/post"
import {CategoryListComponent} from "./component/list/category"
import {FooterComponent} from "./component/footer"
import {CommentComponent} from "./component/comment"
import {GitHubService} from "./service/github"
import {SortByPipe} from "./pipe/sort-by.pipe";
import { SettingsDialogComponent } from './component/settings-dialog/settings-dialog.component'

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
		SearchComponent,
		BookComponent,
		BookComponent,
		CategoryListComponent,
		CategoryComponent,
		FooterComponent,
		CommentComponent,
		SortByPipe,
		SettingsDialogComponent
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
		LinkService,
		SideNavService,
		BookService,
		GitHubService
	],
	bootstrap: [AppComponent],
	entryComponents: [SettingsDialogComponent]
})
export class AppModule {
}
