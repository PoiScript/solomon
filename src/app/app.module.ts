import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { PagesModule } from 'app/pages';
import { LINK_CONFIG, POST_CONFIG, SharedModule } from 'app/shared';

import { links, posts } from 'config';

import { environment } from 'environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    PagesModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: POST_CONFIG,
      useValue: {posts}
    },
    {
      provide: LINK_CONFIG,
      useValue: {links}
    }
  ]
})
export class AppModule {}
