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
import {PostService} from "./service/post/post.service"

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HeaderComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRouting,
		MaterialModule.forRoot(),
		FlexLayoutModule.forRoot(),
	],
	providers: [PostService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
