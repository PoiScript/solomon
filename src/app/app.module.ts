import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {HttpModule} from "@angular/http"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {AppComponent} from "./app.component"
import {AppRouting} from "./app.routing"
import {SortByPipe} from "./pipe/sort-by.pipe"
import {SettingsDialogComponent} from "./components/settings-dialog"
import {ShareModule} from "./modules/share"
import {HomeComponent} from "./components/home/home.component"

@NgModule({
	declarations: [
		AppComponent,
		SortByPipe,
		SettingsDialogComponent,
		HomeComponent,
	],
	imports: [
		ShareModule,
		BrowserModule,
		HttpModule,
		AppRouting,
		MaterialModule.forRoot(),
		FlexLayoutModule.forRoot(),
	],
	bootstrap: [AppComponent],
	entryComponents: [SettingsDialogComponent]
})
export class AppModule {
}
