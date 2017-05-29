import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {HomepageComponent} from './pages/homepage';
import {PostComponent} from './pages/post';
import {LinkComponent} from './pages/link';
import {SharedModule} from './shared/shared.module';
import {AboutComponent} from './pages/about';
import {TagComponent} from './pages/tag';
import {MdButtonModule, MdIconModule, MdListModule, MdToolbarModule} from '@angular/material';
import {SOLOMON_POST, SOLOMON_LINK} from 'app/app.config';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutComponent,
    PostComponent,
    LinkComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouting,
    SharedModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'Solomon')
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: SOLOMON_POST, useValue: environment.post},
    {provide: SOLOMON_LINK, useValue: environment.link}
  ]
})
export class AppModule {
}
