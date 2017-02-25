import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpModule} from '@angular/http'
import {MaterialModule} from '@angular/material'
import {FlexLayoutModule} from '@angular/flex-layout'
import {HashLocationStrategy, LocationStrategy} from '@angular/common'

import {AppComponent} from './app.component'
import {AppRouting} from './app.routing'
import {CONFIG, CONFIG_TOKEN, firebaseConfig} from './config'
import {ThemeService} from './service/theme'
import {AngularFireModule} from 'angularfire2'
import {UserProfileComponent} from './component/user-profile'
import {TokenService} from './service/token'
import {PostListComponent} from './component/post-list'
import {OddPipe} from './pipe/odd.pipe'
import {StepPipe} from './pipe/step.pipe'
import {YearPipe} from './pipe/year.pipe'
import {GitHubService} from './service/github'
import {PostService} from './service/post'

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
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
