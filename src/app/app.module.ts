import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { CoreModule } from 'app/core';
import { LINK_CONFIG, POST_CONFIG, SharedModule } from 'app/shared';
import { AboutModule, HomepageModule, LinkModule, NotFoundModule, PostModule, TagModule } from 'app/pages';

import { links, posts } from 'config';

import { environment } from 'environments/environment';
import { SOLOMON_ROUTES } from './routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'solomon'}),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    RouterModule.forRoot(SOLOMON_ROUTES),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),

    CoreModule,
    SharedModule,
    AboutModule,
    HomepageModule,
    LinkModule,
    NotFoundModule,
    PostModule,
    TagModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: POST_CONFIG,
      useValue: {posts: posts}
    },
    {
      provide: LINK_CONFIG,
      useValue: {links: links}
    }
  ]
})
export class AppModule {}
