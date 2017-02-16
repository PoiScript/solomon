import {BrowserModule} from "@angular/platform-browser"
import {NgModule} from "@angular/core"
import {HttpModule} from "@angular/http"
import {MaterialModule} from "@angular/material"
import {FlexLayoutModule} from "@angular/flex-layout"
import {AppComponent} from "./app.component"
import {AppRouting} from "./app.routing"
import {ShareModule} from "./share"
import {HomeComponent} from "./home/home.component"
import {CONFIG, CONFIG_TOKEN} from "./config"
import {ThemeService} from "./share/service/theme"

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
  providers: [
    {provide: CONFIG_TOKEN, useValue: CONFIG},
    ThemeService
  ]
})
export class AppModule {
}
