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
import {AngularFireModule} from "angularfire2"
import {UserProfileComponent} from "./component/user-profile"
import {TokenService} from "./share/service/token"

export const firebaseConfig = {
  apiKey: "AIzaSyAtCLgC-zOhSg2VojAhvrPrvEyL8scBNPc",
  authDomain: "poi-works.firebaseapp.com",
  databaseURL: "https://poi-works.firebaseio.com",
  storageBucket: "poi-works.appspot.com",
  messagingSenderId: "306363697436"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent
  ],
  imports: [
    ShareModule,
    BrowserModule,
    HttpModule,
    AppRouting,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [AppComponent],
  providers: [
    ThemeService,
    TokenService,
    {provide: CONFIG_TOKEN, useValue: CONFIG}
  ],
  entryComponents: [
    UserProfileComponent
  ]
})
export class AppModule {
}
