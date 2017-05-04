import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ThemeService} from './service/theme';
import {TokenService} from './service/token';
import {GitHubService} from './service/github';
import {PostService} from './service/post';
import {UserProfileComponent} from './component/user-profile';
import {HeaderComponent} from './component/header';
import {FooterComponent} from './component/footer';
import {CONFIG, CONFIG_TOKEN} from '../config';
import {environment} from '../environments/environment';
import {SolomonMaterialModule} from './module/material';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouting,
    FlexLayoutModule,
    SolomonMaterialModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'Solomon')
  ],
  bootstrap: [AppComponent],
  providers: [
    GitHubService,
    ThemeService,
    TokenService,
    PostService,
    {provide: CONFIG_TOKEN, useValue: CONFIG}
  ],
  entryComponents: [
    UserProfileComponent
  ]
})
export class AppModule {
}
