import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';

import { APP_CONFIG } from 'app/app.config';
import { SOLOMON_CONFIG } from '../../solomon.conf';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    CoreModule,
    PagesModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: SOLOMON_CONFIG}
  ]
})
export class AppModule {}
