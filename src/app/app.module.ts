import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { PagesModule } from 'app/pages';
import { LINK_CONFIG, POST_CONFIG, SharedModule } from 'app/shared';

import { links, posts } from 'config';

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
