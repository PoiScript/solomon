import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatListModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environment';

import { AppComponent } from './app.component';
import {
  AboutComponent,
  FooterComponent,
  HeaderComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostContainerComponent,
  PostListComponent,
  TagComponent,
} from './component';
import { AppRoutingModule } from './app.routing.module';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { IconRegistry, PostService } from './service';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LinkComponent,
    NotFoundComponent,
    PostContainerComponent,
    PostListComponent,
    TagComponent,
    SafeHtmlPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'solomon' }),
    BrowserTransferStateModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    TransferHttpCacheModule,
  ],
  providers: [
    PostService,
    { provide: MatIconRegistry, useClass: IconRegistry },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
