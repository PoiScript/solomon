import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import {MaterialModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {AppComponent} from './app.component'
import {AppRouting} from './app.routing'
import {CONFIG, CONFIG_TOKEN, firebaseConfig} from './config'
import {ThemeService} from './service/theme'
import {AngularFireModule} from 'angularfire2'
import {UserProfileComponent} from './component/user-profile'
import {TokenService} from './service/token'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'
import {HeaderComponent} from './component/header'
import {PostListComponent} from './component/post-list/post.component'
import {OddPipe} from './pipe/odd.pipe'
import {StepPipe} from './pipe/step.pipe'
import {YearPipe} from './pipe/year.pipe'
import {GitHubService} from './service/github/github.service'
import {PostService} from './service/post/post.service'

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HeaderComponent,
    PostListComponent,
    OddPipe,
    StepPipe,
    YearPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRouting,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [AppComponent],
  providers: [
    GitHubService,
    ThemeService,
    TokenService,
    PostService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: CONFIG_TOKEN, useValue: CONFIG}
  ],
  entryComponents: [
    UserProfileComponent
  ]
})
export class AppModule {
}
