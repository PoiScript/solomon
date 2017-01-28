import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {HttpModule} from "@angular/http"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {AppComponent} from "./app.component"
import {NavComponent} from "./nav"
import {AppRouting} from "./app.routing"
import {ThemeService} from "./service/theme"
import {SideNavService} from "./service/sidenav"
import {SortByPipe} from "./pipe/sort-by.pipe"
import {SettingsDialogComponent} from "./components/settings-dialog"
import {ShareModule} from "./modules/share"
import {CategoryService} from "./service/category"

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		SortByPipe,
		SettingsDialogComponent,
	],
	imports: [
		ShareModule,
		BrowserModule,
		HttpModule,
		AppRouting,
		MaterialModule.forRoot(),
		FlexLayoutModule.forRoot(),
	],
	providers: [
		ThemeService,
		SideNavService,
		CategoryService
	],
	bootstrap: [AppComponent],
	entryComponents: [SettingsDialogComponent]
})
export class AppModule {
}
