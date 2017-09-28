import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from 'app/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/core';
import { SharedModule } from 'app/shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({appId: 'solomon'}),
    CoreModule,
    SharedModule,
    HttpModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
