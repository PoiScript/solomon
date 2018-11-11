import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environment';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { AboutModule } from './about/about.module';
import { HomepageModule } from './homepage/homepage.module';
import { LinkModule } from './link/link.module';
import { NotFoundModule } from './not-found/not-found.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'solomon' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    TransferHttpCacheModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AboutModule,
    HomepageModule,
    LinkModule,
    NotFoundModule,
    PostModule,
    TagModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
