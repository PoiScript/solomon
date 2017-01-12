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
import {LinkComponent} from "./link"
import {YearPipe} from "./pipe/year.pipe"
import {ArchiveComponent} from "./archive/archive.component"
import {CategoryComponent} from "./category/category.component"
import {CategoryPipe} from "./pipe/category.pipe"
import {CategoryService} from "./service/category"

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HeaderComponent,
		ArchiveComponent,
		LinkComponent,
		CategoryComponent,
		YearPipe,
		CategoryPipe,
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
		CategoryService
	],
	bootstrap: [AppComponent],
})
export class AppModule {
}
