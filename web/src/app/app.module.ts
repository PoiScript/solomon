import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import {
  MatIconModule,
  MatListModule,
  MatRippleModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AboutComponent,
  FooterComponent,
  HeaderComponent,
  HomepageComponent,
  LinkComponent,
  NotFoundComponent,
  PostComponent,
} from './components';
import { SafeHtmlPipe } from './safe-html.pipe';
import { PostService } from './post.service';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomepageComponent,
    LinkComponent,
    NotFoundComponent,
    PostComponent,
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
    MatIconModule,
    MatListModule,
    MatRippleModule,
    TransferHttpCacheModule,
  ],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
