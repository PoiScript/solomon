import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BrowserModule,
  BrowserTransferStateModule,
  DomSanitizer,
} from '@angular/platform-browser';
import {
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatListModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatTooltipModule,
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
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    TransferHttpCacheModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {
    this.registerIcon('arrow');
    this.registerIcon('github');
    this.registerIcon('rss');
  }

  private registerIcon(name: string) {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/svg/${name}.svg`),
    );
  }
}
