import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from './core/core.module';
import { TagModule } from './tag/tag.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    CoreModule,
    TagModule,
    SharedModule,
    HttpModule,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
