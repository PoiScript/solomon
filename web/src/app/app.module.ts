import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import {
  MatIconModule,
  MatIconRegistry,
  MatListModule,
  MatRippleModule,
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
  PostComponent,
} from './component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import {
  IconRegistry,
  PostService,
  PostResolver,
  AboutResolver,
  PostGroupResolver,
} from './service';

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
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomepageComponent,
          pathMatch: 'full',

          resolve: { group: PostGroupResolver },
        },
        {
          path: 'about',
          component: AboutComponent,
          resolve: { post: AboutResolver },
        },
        {
          path: 'post/:slug',
          component: PostComponent,
          resolve: { post: PostResolver },
        },
        { path: 'link', component: LinkComponent },
        { path: '**', component: NotFoundComponent },
      ],
      { scrollPositionRestoration: 'top' },
    ),
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
  providers: [
    PostService,
    { provide: MatIconRegistry, useClass: IconRegistry },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
