import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdIconModule, MdListModule, MdMenuModule, MdToolbarModule} from '@angular/material';

import {AppComponent} from 'app/app.component';
import {AppRouting} from 'app/app.routing';
import {environment} from '../environments/environment';
import {HomepageComponent} from 'app/pages/homepage';
import {PostComponent} from 'app/pages/post';
import {LinkComponent} from 'app/pages/link';
import {SharedModule} from 'app/shared/shared.module';
import {AboutComponent} from 'app/pages/about';
import {TagComponent} from 'app/pages/tag';

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
    MdMenuModule,
    MdButtonModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase, 'Solomon')
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
